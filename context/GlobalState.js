import React, {
  createContext,
  useReducer,
  useEffect,
} from 'react';
import AppReducer from '../reducers/AppReducer';
import { log } from '../utils/logger'

const { env: { NODE_ENV }} = process

const initialState = {
  NODE_ENV,
  networkVersion: null,
  signingIn: null,
  account: null,
  name: null,
  loggedIn: null,
  provider: null,
  connection: null,
  imx: null,
  picks: [],
  options: [],
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state

  function setNetworkVersion(data) {
    dispatch({
      type: 'UPDATE_NETWORK_VERSION',
      payload: data
    });
  }

  function setSigningIn(data) {
    dispatch({
      type: 'UPDATE_SIGNING_IN',
      payload: data
    });
  }

  function setAccount(data) {
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: data
    });
  }

  function setName(data) {
    dispatch({
      type: 'UPDATE_NAME',
      payload: data
    });
  }

  function setLoggedIn(data) {
    dispatch({
      type: 'UPDATE_LOGGED_IN',
      payload: data
    });
  }

  function setProvider(data) {
    dispatch({
      type: 'UPDATE_PROVIDER',
      payload: data
    });
  }

  function setConnection(data) {
    dispatch({
      type: 'UPDATE_CONNECTION',
      payload: data
    });
  }

  function setImx(data) {
    dispatch({
      type: 'UPDATE_IMX',
      payload: data
    });
  }

  function setPicks(data) {
    dispatch({
      type: 'UPDATE_PICKS',
      payload: data
    });
  }

  function setOptions(data) {
    dispatch({
      type: 'UPDATE_OPTIONS',
      payload: data
    });
  }

  useEffect(() => {
    log('state', 'rgb(217, 38, 169)', state);
  }, [state])

  return ( <GlobalContext.Provider value = {
      {
        // networkVersion
        networkVersion: state.networkVersion,
        setNetworkVersion,

        // signingIn 
        signingIn: state.signingIn,
        setSigningIn,
        
        // account
        account: state.account,
        setAccount,
        
        // name
        name: state.name,
        setName,
        
        // loggedIn
        loggedIn: state.loggedIn,
        setLoggedIn,
        
        // provider
        provider: state.provider,
        setProvider,
        
        // connection
        connection: state.connection,
        setConnection,
        
        // imx
        imx: state.imx,
        setImx,

        // picks 
        picks: state.picks,
        setPicks,

        // options
        options: state.options,
        setOptions,
      }
    } > {
      children
    } </GlobalContext.Provider>
  )
}