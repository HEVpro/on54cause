'use client'

import { useEffect, useState } from 'react'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import {
    CHAIN_NAMESPACES,
    IProvider,
    UX_MODE,
    WALLET_ADAPTERS,
    WEB3AUTH_NETWORK,
} from '@web3auth/base'
import { AuthAdapter } from '@web3auth/auth-adapter'

const clientId =
    'BJjC-tJlrAEXidW_C3Z8mCAZi4M73qRwcjlVl8wKbfGY9TwLDjDLA8gqG6gW4Ha4a0oXm2mToBLkmQzmdLCxCKw' // get from https://dashboard.web3auth.io

const chainConfig = {
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

export const useWeb3AuthProvider = () => {
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [loggedIn, setLoggedIn] = useState(false)

    const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
    })

    const web3auth = new Web3AuthNoModal({
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
        privateKeyProvider,
    })

    const authAdapter = new AuthAdapter({
        adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
            loginConfig: {
                email_passwordless: {
                    verifier: 'w3a-email-passwordless-demo',
                    typeOfLogin: 'email_passwordless',
                    clientId,
                },
            },
        },
    })
    web3auth.configureAdapter(authAdapter)

    useEffect(() => {
        const init = async () => {
            if (!web3auth) return
            try {
                await web3auth.init()
                setProvider(web3auth.provider)

                if (web3auth.connected) {
                    setLoggedIn(true)
                }
            } catch (error) {
                console.error('error in init', error)
            }
        }

        init()
    }, [])

    const login = async () => {
        const web3authProvider = await web3auth.connectTo(
            WALLET_ADAPTERS.AUTH,
            {
                loginProvider: 'google',
            }
        )
        setProvider(web3authProvider)
        if (web3auth.connected) {
            setLoggedIn(true)
        }
    }

    return {
        provider,
        login,
    }
}
