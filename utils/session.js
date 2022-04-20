import { getNonce } from "./nonce"

export const getSession = () => {
  return `Session ID: ${getNonce()}`
}