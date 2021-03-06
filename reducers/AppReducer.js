import { log } from '../utils/logger'

export default (state, action) => {

  const d = new Date();
  log('→', 'rgb(229, 231, 235)', d.toLocaleTimeString());
  log('action', 'rgb(251, 189, 35)', action);

  switch (action.type) {
    case 'UPDATE_NETWORK_VERSION':
      return {
        ...state,
        networkVersion: action.payload,
      }
    case 'UPDATE_SIGNING_IN':
      return {
        ...state,
        signingIn: action.payload,
      }
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload,
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      }
    case 'UPDATE_LOGGED_IN':
      return {
        ...state,
        loggedIn: action.payload,
      }
    case 'UPDATE_PROVIDER':
      return {
        ...state,
        provider: action.payload,
      }
    case 'UPDATE_CONNECTION':
      return {
        ...state,
        connection: action.payload,
      }
    case 'UPDATE_IMX':
      return {
        ...state,
        imx: action.payload,
      }
    case 'UPDATE_PICKS':
      return {
        ...state,
        picks: action.payload,
      }
    case 'UPDATE_OPTIONS':
      return {
        ...state,
        options: action.payload,
      }
    case 'UPDATE_LEADERBOARD':
      return {
        ...state,
        leaderboard: action.payload,
      }
    default:
      return state;
  }
}