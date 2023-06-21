import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "hardhat-gas-reporter";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  networks: {
    goerli: {
      accounts: [process.env.PRIVATE_KEY!, process.env.PRIVATE_KEY_2!],
      url: process.env.URL_GOERLI!,
    },
    mumbai: {
      accounts: [process.env.PRIVATE_KEY!, process.env.PRIVATE_KEY_2!],
      url: process.env.URL_MUMBAI!,
    },
    sepolia: {
      accounts: [process.env.PRIVATE_KEY!, process.env.PRIVATE_KEY_2!],
      url: process.env.URL_SEPOLIA!,
    }
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY!,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY!
    }
  },
  gasReporter: {
    enabled: false,
    currency: 'USD',
  },
};

export default config;