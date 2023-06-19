import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
// Imports de RainbowKit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "~/components/layouts/MainLayout";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia], // TODO: Decidir qué cadenas querremos.
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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
