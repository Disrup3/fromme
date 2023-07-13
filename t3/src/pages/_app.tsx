import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
// Imports de RainbowKit
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Toaster } from "react-hot-toast";
import MainLayout from "~/components/layouts/MainLayout";

const { chains, publicClient } = configureChains(
  [mainnet, polygonMumbai, polygon], // TODO: Decidir qué cadenas querremos.
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "FromMe App",
  projectId: "YOUR_PROJECT_ID", // TODO: Decidir si queremos WalletConnect.....no
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Log in Fromme",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider
            coolMode
            chains={chains}
            theme={lightTheme({
              borderRadius: "large",
              accentColor: "#6832F3",
            })}
          >
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                className: "",
                duration: 5000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                },
              }}
            />
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
