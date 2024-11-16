import { CHAIN_NAMESPACES } from '@web3auth/base'

export const clientId =
    'BJjC-tJlrAEXidW_C3Z8mCAZi4M73qRwcjlVl8wKbfGY9TwLDjDLA8gqG6gW4Ha4a0oXm2mToBLkmQzmdLCxCKw'

export const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x13882',
    rpcTarget:
        'https://polygon-amoy.g.alchemy.com/v2/F-tuWTTjOf3oo7e1PpXfnc8QTJKuT5n0',
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: 'Polygon Amoy',
    blockExplorerUrl: 'https://amoy.polygonscan.com/',
    ticker: 'POL',
    tickerName: 'Ethereum',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
}
export const verifier = 'on54-cause-verifier'

export const contractAddress = '0xa4Bb9cee0fb14865B83245b403a6036049e3a9A6'
