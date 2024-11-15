import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
import "hardhat-chai-matchers-viem";
import "hardhat-gas-reporter";

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
      "not-used": "not-used",
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
    ],
  },
};

export default config;
