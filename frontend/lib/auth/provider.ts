import { useEffect, useState } from "react";
import {
  CHAIN_NAMESPACES,
  IProvider,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";

const clientId =
  "BJjC-tJlrAEXidW_C3Z8mCAZi4M73qRwcjlVl8wKbfGY9TwLDjDLA8gqG6gW4Ha4a0oXm2mToBLkmQzmdLCxCKw"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13882",
  rpcTarget:
    "https://polygon-amoy.g.alchemy.com/v2/F-tuWTTjOf3oo7e1PpXfnc8QTJKuT5n0",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Polygon Amoy",
  blockExplorerUrl: "https://amoy.polygonscan.com/",
  ticker: "POL",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const authAdapter = new AuthAdapter({
  adapterSettings: {
    clientId,
    uxMode: "popup",
    loginConfig: {
      google: {
        name: "On54Cause",
        verifier: "on54-cause-verifier",
        typeOfLogin: "google",
        clientId:
          "436172427709-m9an5dcu35ic2547k74mq99miondv24k.apps.googleusercontent.com",
      },
    },
  },
  privateKeyProvider,
});
web3auth.configureAdapter(authAdapter);

export { web3auth, authAdapter, privateKeyProvider };
