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
import { getPublicCompressed } from '@toruslabs/eccrypto'
import { useRouter } from 'next/navigation'
import { log } from 'console'
import { set } from 'react-hook-form'

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

export const useWeb3AuthNoModalProvider = () => {
    const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean | null>(false)
    const router = useRouter()

    function uiConsole(...args: any[]): void {
        const el = document.querySelector('#console>p')
        if (el) {
            el.innerHTML = JSON.stringify(args || {}, null, 2)
        }
    }
    const getUserInfo = async () => {
        if (!web3auth) {
            uiConsole('web3auth not initialized yet')
            return
        }
        const user = await web3auth.getUserInfo()
        uiConsole(user)
    }

    const validateIdToken = async () => {
        if (!web3auth) {
            uiConsole('web3auth not initialized yet')
            return
        }
        const { idToken } = await web3auth.authenticateUser()
        console.log(idToken)

        const privKey: any = await web3auth.provider?.request({
            method: 'eth_private_key',
        })
        console.log(privKey)
        const pubkey = getPublicCompressed(
            Buffer.from(privKey, 'hex')
        ).toString('hex')

        // Validate idToken with server
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ appPubKey: pubkey }),
        })
        if (res.status === 200) {
            uiConsole('JWT Verification Success')
            await getUserInfo()
        } else {
            uiConsole('JWT Verification Failed')
            console.log('JWT Verification Failed')
            await logout()
            setLoggedIn(false)
            setProvider(null)
        }
        return res.status
    }

    useEffect(() => {
        const init = async () => {
            try {
                const privateKeyProvider = new EthereumPrivateKeyProvider({
                    config: { chainConfig },
                })

                const web3authInstance = new Web3AuthNoModal({
                    clientId,
                    privateKeyProvider,
                    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
                })

                const authAdapter = new AuthAdapter({
                    adapterSettings: {
                        uxMode: UX_MODE.REDIRECT,
                    },
                    privateKeyProvider,
                })
                web3authInstance.configureAdapter(authAdapter)
                setWeb3auth(web3authInstance)
                await web3authInstance.init()
                setProvider(web3authInstance.provider)
                if (web3authInstance.connected) {
                    setLoggedIn(true)
                    await validateIdToken()
                } else {
                    setLoggedIn(false)
                    setProvider(null)
                }
            } catch (error) {
                console.error(error)
            }
        }

        init()
    }, [])

    const login = async () => {
        if (!web3auth) {
            uiConsole('web3auth not initialized yet')
            return
        }
        const web3authProvider = await web3auth.connectTo(
            WALLET_ADAPTERS.AUTH,
            {
                loginProvider: 'google',
                loginParams: {
                    isLogged: 'https://on54cause.vercel.app',
                },
            }
        )
        setProvider(web3authProvider)
        setLoggedIn(true)
    }

    const logout = async () => {
        if (!web3auth) {
            uiConsole('web3auth not initialized yet')
            return
        }
        await web3auth.logout({
            cleanup: true,
        })
        setProvider(null)
        setLoggedIn(false)

        router.push('/')
    }

    return {
        provider,
        setProvider,
        setLoggedIn,
        login,
        loggedIn,
        logout,
    }
}
