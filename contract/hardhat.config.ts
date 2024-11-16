import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
import "hardhat-chai-matchers-viem";
import "hardhat-gas-reporter";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY!,
      "chiliz-spicy": "not-used",
      "polygon-cardona": "not-used",
    },
    customChains: [
      {
        network: "polygon-cardona",
        chainId: 2442,
        urls: {
          apiURL: "https://explorer-ui.zkevm-testnet.com/api",
          browserURL: "https://explorer-ui.zkevm-testnet.com",
        },
      },
      {
        network: "chiliz-spicy",
        chainId: 88882,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan",
          browserURL: "https://testnet.chiliscan.com",
        },
      },
    ],
  },
  networks: {
    "chiliz-spicy": {
      url: "https://spicy-rpc.chiliz.com",
      accounts: [process.env.PRIVATE_KEY!],
    },
    "polygon-cardona": {
      url: process.env.ALCHEMY_POLYGON_CARDONA_URL!,
      accounts: [process.env.PRIVATE_KEY!],
    },
    "polygon-amoy": {
      url: process.env.ALCHEMY_POLYGON_AMOY_URL!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
