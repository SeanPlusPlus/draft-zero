import React, { useContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Link } from '@imtbl/imx-sdk'
import { GlobalContext } from '../context/GlobalState'
import { getName, getShortAddress } from '../utils/name'

// components
import Loading from './loading'

const Login = () => {

  const {
    // networkVersion 
    networkVersion,
    setNetworkVersion,

    // signingIn
    signingIn,
    setSigningIn,
    
    // account
    account,
    setAccount,

    // name
    name,
    setName,

    // connection
    connection,
    setConnection,
  
    // loggedIn
    loggedIn,
    setLoggedIn,

    // imx
    imx,
    setImx,
  } = useContext(GlobalContext)
  

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
    setNetworkVersion(ethereum.networkVersion)
  }

  async function signIn() {
    const authData = await fetch(`/api/auth?address=${account}`)
    const user = await authData.json()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const signature = await signer.signMessage(user.nonce.toString())
    setSigningIn(true)
    const response = await fetch(`/api/verify?address=${account}&signature=${signature}`)
    const data = await response.json()
    const address = await signer.getAddress();
    const ensName = await provider.lookupAddress(address);
    const name = getName({ ensName, address });
    setSigningIn(false)
    setName(name)
    setLoggedIn(data.authenticated)
  }

  async function setupImxAccount() {
    const link = new Link('https://link.ropsten.x.immutable.com');

    // Register user, you can persist address to local storage etc.
    const {address, starkPublicKey } = await link.setup({});
    setImx({
      address,
      starkPublicKey,
    })
}

  return(
    <div className="card md:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        {
          !connection && <button className="btn" onClick={connect}>Connect Wallet</button>
        }
        { connection && !loggedIn && (
          <div>
            { networkVersion === '3' ? (
              <>
                {signingIn ? (
                  <Loading />
                ) : (
                  <button className="btn px-12" onClick={signIn}>Sign In</button>
                )}
              </>
            ) : (
              <>
                <button className="btn" onClick={connect}>Connect Wallet</button>
                <div className="alert alert-warning shadow-lg mt-5">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Switch to the Ropsten Network and re-connect</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {
          loggedIn && (
            <>
              <code className="text-md">Public Key: {name}</code>
              <div className="divider"></div>
              {!imx ? (
                <button className="btn" onClick={setupImxAccount}>Connect to Immutable X</button>
              ) : (
                <code className="text-md">Stark Key: {getShortAddress(imx.starkPublicKey)}</code>
              )}
            </>
          )
        }
      </div>
    </div>
  )
}

export default Login
