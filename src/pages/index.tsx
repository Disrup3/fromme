import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>FromMe</title>
        <meta
          name="description"
          content="Fromme es un proyecto que permite a artistas, fotogrados, famosos subir sus momentos y contenido mas memorable en forma de nft."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>FROM ME</h1>
      </main>
    </>
  );
};

export default Home;
