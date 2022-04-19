import React, { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getName } from '../utils/name'

const Login = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState(null)
  const [connection, setConnection] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  async function getWeb3Modal() {
    let Torus = (await import('@toruslabs/torus-embed')).default
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions: {
        torus: {
          package: Torus
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: 'your-infura-id'
          },
        },
      },
    })
    return web3Modal
  }

  async function connect() {
    const web3Modal = await getWeb3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const accounts = await provider.listAccounts()
    setConnection(connection)
    setAccount(accounts[0])
  }

  async function signIn() {
    const authData = await fetch(`/api/auth?address=${account}`)
    const user = await authData.json()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    // const signature = await signer.signMessage(`Session ID: ${user.nonce.toString()}`)
    const signature = await signer.signMessage(user.nonce.toString())
    const response = await fetch(`/api/verify?address=${account}&signature=${signature}`)
    const data = await response.json()
    const address = await signer.getAddress();
    const ensName = await provider.lookupAddress(address);
    const name = getName({ ensName, address });
    setName(name)
    setLoggedIn(data.authenticated)
  }

  return(
      <div>
        {
          !connection && <button className="btn" onClick={connect}> Connect Wallet</button>
        }
        { connection && !loggedIn && (
          <div>
            <button className="btn" onClick={signIn}>Sign In</button>
          </div>
        )}
        {
          loggedIn && <h3>Welcome, {name || account}</h3>
         }
      </div>
  )
}

export default Login
