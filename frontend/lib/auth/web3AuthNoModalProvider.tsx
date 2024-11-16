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
import { clientId, chainConfig } from '@/lib/constants'
import RPC from './viemRPC' // for using viem
import { AbiItem } from 'viem'

export const useWeb3AuthNoModalProvider = () => {
    const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean | null>(false)
    const [userAddress, setUserAddress] = useState<string | null>(null)

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
        return user
    }

    const getAccounts = async () => {
        if (!provider) {
            uiConsole('provider not initialized yet')
            return
        }
        const address = await RPC.getAccounts(provider)
        if (address.length > 0) {
            setUserAddress(address[0])
        }
        return address
    }

    const writeContract = async (
        abi: AbiItem[],
        address: string,
        functionName: string,
        args: any
    ) => {
        if (!provider) {
            uiConsole('provider not initialized yet')
            return
        }
        try {
            const receipt = await RPC.writeContract(
                provider,
                abi,
                address,
                functionName,
                args
            )
            console.log('Contract Receipt:', receipt)
            return receipt
        } catch (error) {
            console.error('Error writing contract:', error)
            return error
        }
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
        console.log('useEffect triggered: initializing web3Auth')
        const init = async () => {
            try {
                console.log('Creating EthereumPrivateKeyProvider...')
                const privateKeyProvider = new EthereumPrivateKeyProvider({
                    config: { chainConfig },
                })
                console.log(
                    'EthereumPrivateKeyProvider created:',
                    privateKeyProvider
                )

                console.log('Creating Web3AuthNoModal instance...')
                const web3authInstance: Web3AuthNoModal = new Web3AuthNoModal({
                    clientId,
                    privateKeyProvider,
                    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
                    uiConfig: {
                        appName: 'On54Cause',
                        mode: 'light',
                        defaultLanguage: 'en',
                    },
                })
                console.log(
                    'Web3AuthNoModal instance created:',
                    web3authInstance
                )

                console.log('Configuring AuthAdapter...')
                const authAdapter = new AuthAdapter({
                    adapterSettings: {
                        uxMode: UX_MODE.REDIRECT,
                    },
                    privateKeyProvider,
                })
                console.log('AuthAdapter configured:', authAdapter)

                console.log('Configuring adapter for web3authInstance...')
                web3authInstance.configureAdapter(authAdapter)
                setWeb3auth(web3authInstance)

                console.log('Initializing web3authInstance...')
                await web3authInstance.init()
                setProvider(web3authInstance.provider)

                if (web3authInstance.connected) {
                    console.log('web3authInstance connected successfully.')
                    setLoggedIn(true)
                    await validateIdToken()
                } else {
                    console.log('web3authInstance not connected.')
                    setLoggedIn(false)
                    setProvider(null)
                }
            } catch (error) {
                console.error('Error in init function:', error)
            }
        }

        init()
    }, [])

    useEffect(() => {
        if (loggedIn) {
            getAccounts()
        }
    }, [loggedIn])

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
    }

    return {
        provider,
        setProvider,
        setLoggedIn,
        login,
        loggedIn,
        logout,
        getUserInfo,
        userAddress,
        writeContract,
    }
}
