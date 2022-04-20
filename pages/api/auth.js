import { findUser, createUser, updateUserNonce } from '../../utils/users'
import { getSession } from '../../utils/session'

export default async function auth(req, res) {
  const { address } = req.query
  let user
  try {
    const exists = await findUser(address)
    const { data, ref: { id }} = exists
    user = await updateUserNonce({ id, data, nonce: getSession() })
  } catch (e) {
    user = await createUser({
      address,
      nonce: getSession()
    })
  }
  res.status(200).json({
    ...user.data,
    message: 'hello world'
  })  
}