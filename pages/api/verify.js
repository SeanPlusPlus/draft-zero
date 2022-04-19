/* pages/api/verify.js */
import { ethers } from 'ethers'
import { findUser } from '../../utils/users'

export default async function verify(req, res) {
  let authenticated = false
  const { address, signature } = req.query
  const user = await findUser(address)
  const { data } = user
  const decodedAddress = ethers.utils.verifyMessage(data.nonce.toString(), signature)
  if (address.toLowerCase() === decodedAddress.toLowerCase()) {
    authenticated = true
  }
  res.status(200).json({ authenticated })
}