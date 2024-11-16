import { useEffect, useState } from 'react'
import { WEB3AUTH_NETWORK } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { AuthAdapter } from '@web3auth/auth-adapter'
import { clientId, chainConfig } from '@/lib/constants'

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
        clientId,
        uxMode: 'popup',
        loginConfig: {
            google: {
                name: 'On54Cause',
                verifier: 'on54-cause-verifier',
                typeOfLogin: 'google',
                clientId:
                    '436172427709-m9an5dcu35ic2547k74mq99miondv24k.apps.googleusercontent.com',
            },
        },
    },
    privateKeyProvider,
})
web3auth.configureAdapter(authAdapter)

export { web3auth, authAdapter, privateKeyProvider }
