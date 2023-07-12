/* eslint-disable */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

interface VerifyResult {
  success: boolean;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}" ) as Partial<SiweMessage>
          );
          console.log(siwe);
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!);

          const result: VerifyResult  = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            // Check if user exists
            let user = await prisma.user.findUnique({
              where: {
                address: siwe.address,
              },
            });
            // Create new user if doesn't exist
            if (!user) {
              user = await prisma.user.create({
                data: {
                  address: siwe.address,
                },
              });
              // create account
              await prisma.account.create({
                data: {
                  userId: user.id,
                  type: "credentials",
                  provider: "Ethereum",
                  providerAccountId: siwe.address,
                },
              });
            }
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage: boolean =
    req.method === "GET" && req.query.nextauth.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }): Promise<any> {
        session.address = token.sub as string;
        session.user.name = token.sub as string;
        session.user.image = "https://www.fillmurray.com/128/128";
        return session;
      },
    },
  });
}
