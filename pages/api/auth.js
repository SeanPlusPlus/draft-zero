import { findUser, createUser } from '../../utils/users'

export default async function auth(req, res) {
  const {address} = req.query
  let user
  try {
    user = await findUser(address)
  } catch (e) {
    user = await createUser({
      address,
      nonce: Math.floor(Math.random() * 10000000)
    })
  }
  // TODO update nonce if user exists
  res.status(200).json(user)  
}