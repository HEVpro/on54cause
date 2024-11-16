'use client'

import { useEffect, useState } from 'react'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { ADAPTER_EVENTS, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base'
import { clientId, chainConfig, verifier } from '@/lib/constants'
import { decodeToken, Web3Auth } from '@web3auth/single-factor-auth'
import { PasskeysPlugin } from '@web3auth/passkeys-sfa-plugin'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import { CredentialResponse } from '@react-oauth/google'
import { shouldSupportPasskey } from '../utils'

export const useWeb3AuthSingleAuthProvider = () => {
    const [web3authSFAuth, setWeb3authSFAuth] = useState<Web3Auth | null>(null)
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [pkPlugin, setPkPlugin] = useState<PasskeysPlugin | null>(null)
    const [wsPlugin, setWsPlugin] = useState<WalletServicesPlugin | null>(null)
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    function uiConsole(...args: any[]): void {
        const el = document.querySelector('#console>p')
        if (el) {
            el.innerHTML = JSON.stringify(args || {}, null, 2)
        }
    }

    useEffect(() => {
        const init = async () => {
            try {
                const ethereumPrivateKeyProvider =
                    new EthereumPrivateKeyProvider({
                        config: { chainConfig },
                    })
                // Initialising Web3Auth Single Factor Auth SDK
                const web3authSfa = new Web3Auth({
                    clientId, // Get your Client ID from Web3Auth Dashboard
                    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // ["sapphire_mainnet", "sapphire_devnet", "mainnet", "cyan", "aqua", and "testnet"]
                    usePnPKey: false, // Setting this to true returns the same key as PnP Web SDK, By default, this SDK returns CoreKitKey.
                    privateKeyProvider: ethereumPrivateKeyProvider,
                })
                const plugin = new PasskeysPlugin({ buildEnv: 'testing' })
                web3authSfa?.addPlugin(plugin)
                setPkPlugin(plugin)
                const wsPlugin = new WalletServicesPlugin({
                    walletInitOptions: {
                        whiteLabel: {
                            logoLight:
                                'https://web3auth.io/images/web3auth-logo.svg',
                        },
                    },
                })
                web3authSfa?.addPlugin(wsPlugin)
                setWsPlugin(wsPlugin)
                web3authSfa.on(ADAPTER_EVENTS.CONNECTED, (data) => {
                    setProvider(web3authSfa.provider)
                    if (web3authSfa.state) {
                        setIsLoggingIn(true)
                    }
                })
                web3authSfa.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                    setProvider(null)
                })
                await web3authSfa.init()
                setWeb3authSFAuth(web3authSfa)
            } catch (error) {
                console.error(error)
            }
        }

        init()
    }, [])

    console.log('wsPlugin', wsPlugin)

    const onSuccess = async (response: CredentialResponse) => {
        try {
            if (!web3authSFAuth) {
                uiConsole('Web3Auth Single Factor Auth SDK not initialized yet')
                return
            }
            setIsLoggingIn(true)
            const idToken = response.credential
            console.info('idToken -->', idToken)
            if (!idToken) {
                setIsLoggingIn(false)
                return
            }
            const { payload } = decodeToken(idToken)
            console.info('payload -->', payload)
            await web3authSFAuth.connect({
                verifier,
                verifierId: (payload as any)?.email,
                idToken: idToken!,
            })
            // setIsLoggingIn(false)
        } catch (err) {
            // Single Factor Auth SDK throws an error if the user has already enabled MFA
            // One can use the Web3AuthNoModal SDK to handle this case
            setIsLoggingIn(false)
            console.error('is already enabled', err)
        }
    }

    const initializePlugins = (web3authSfa: Web3Auth) => {
        const pkPlugin = new PasskeysPlugin({ buildEnv: 'testing' })
        web3authSfa.addPlugin(pkPlugin)
        setPkPlugin(pkPlugin)

        const wsPlugin = new WalletServicesPlugin({
            walletInitOptions: {
                whiteLabel: {
                    logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
                },
            },
        })
        web3authSfa.addPlugin(wsPlugin)
        setWsPlugin(wsPlugin)
    }

    const loginWithPasskey = async () => {
        try {
            if (!pkPlugin) throw new Error('Passkey plugin not initialized')
            const result = shouldSupportPasskey()
            if (!result.isBrowserSupported) {
                uiConsole('Browser not supported')
                return
            }
            const res = await pkPlugin.loginWithPasskey()
            if (res) {
                console.info('Passkey logged in successfully')
                setIsLoggingIn(true)
                return { isLoggedIn: true }
            }
            setIsLoggingIn(false)
        } catch (error) {
            console.error((error as Error).message)
            console.error((error as Error).message)
        }
    }

    const getUserInfo = async () => {
        if (!web3authSFAuth) {
            uiConsole('Web3Auth Single Factor Auth SDK not initialized yet')
            return
        }
        const getUserInfo = await web3authSFAuth.getUserInfo()
        return getUserInfo
    }

    const googleLogout = async () => {
        if (!provider) {
            uiConsole('Web3Auth Single Factor Auth SDK not initialized yet')
            return
        }
        googleLogout()
        return
    }
    const logoutPassKeys = async () => {
        if (!web3authSFAuth) {
            console.info('Web3Auth Single Factor Auth SDK not initialized yet')
            return
        }
        if (!pkPlugin) {
            console.error('Passkey plugin not initialized')
            return
        }
        await web3authSFAuth.logout()
    }

    const registerPasskey = async () => {
        try {
            if (!pkPlugin || !web3authSFAuth) {
                uiConsole('plugin not initialized yet')
                return
            }
            const result = shouldSupportPasskey()
            if (!result.isBrowserSupported) {
                uiConsole('Browser not supported')
                return
            }
            const userInfo = await web3authSFAuth?.getUserInfo()
            const res = await pkPlugin.registerPasskey({
                username: `google|${
                    userInfo?.email || userInfo?.name
                } - ${new Date().toLocaleDateString('en-GB')}`,
            })
            if (res) uiConsole('Passkey saved successfully')
        } catch (error: unknown) {
            uiConsole((error as Error).message)
        }
    }

    const listAllPasskeys = async () => {
        if (!pkPlugin) {
            uiConsole('plugin not initialized yet')
            return
        }
        return await pkPlugin.listAllPasskeys()
    }

    const connectPlugin = async (sessionId: string) => {
        try {
            const connectionOptions = { sessionId } // Use the sessionId for connection
            if (!wsPlugin) {
                uiConsole('Wallet services plugin instance is not available')
                return
            }
            await wsPlugin.connect(connectionOptions)
            uiConsole('Wallet services plugin connected')
        } catch (error) {
            uiConsole('Failed to connect wallet services plugin', error)
        }
    }

    const showCheckout = async (sessionId: string) => {
        if (!wsPlugin) {
            uiConsole('Wallet services plugin not initialized yet')
            return
        }
        await wsPlugin.connect({ sessionId }) // Connect to the sessionId
        await wsPlugin.showCheckout({
            show: true,
        }) // Opens the TopUp modal
    }

    const showWalletScanner = async () => {
        if (!wsPlugin) {
            uiConsole('wallet services plugin not initialized yet')
            return
        }
        await wsPlugin.showWalletConnectScanner()
    }

    return {
        provider,
        setProvider,
        onSuccess,
        googleLogout,
        logoutPassKeys,
        loginWithPasskey,
        isLoggingIn,
        registerPasskey,
        listAllPasskeys,
        getUserInfo,
        connectPlugin,
        showCheckout,
    }
}
