import faunadb from 'faunadb'

require('dotenv').config()

const FAUNA_SECRET = process.env.FAUNA_SECRET
const q = faunadb.query
const client = new faunadb.Client({
  secret: FAUNA_SECRET,
  domain: "db.us.fauna.com",
  port: 443,
  scheme: 'https',
})

const {
  Collection,
  Ref,
  Get,
  Select,
  Paginate,
  Match,
  Index,
  Create,
} = q

export async function findUser(address) {
  const index = 'users_by_address'
  const item = await client.query(
    Select([0],
      Paginate(
        Match(
          Index(index),
          address
        )
      )
    )
  )
  const ref = item[1].value.id
  const collection = 'users'
  const user = await client.query(
    Get(
      Ref(
        Collection(collection),
        ref
      )
    )
  )

  return user.data
}

export async function createUser({ address, nonce }) {
  let exists = null

  // check for username
  try {
    exists = await findUser(address)
  } catch {
    exists = false
  }

  if (exists) {
    return {valid: false, message: 'Username exists'}
  }

  const user = {
    address,
    nonce,
  }
 
  const collection = 'users'
  const new_user = await client.query(
    Create(
      Collection(collection),
      { data: user }
    )
  )

  return user
}