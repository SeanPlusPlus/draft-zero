/* pages/api/verify.js */
import { ethers } from 'ethers'
import { findUser } from '../../utils/users'

export default async function verify(req, res) {
  let authenticated = false
  const { address, signature } = req.query
  const user = await findUser(address)
  const decodedAddress = ethers.utils.verifyMessage(user.nonce.toString(), signature)
  if (address.toLowerCase() === decodedAddress.toLowerCase()) {
    authenticated = true
  }
  res.status(200).json({authenticated})
}