import faunadb from 'faunadb'
import mint from '../nft/mint'

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
  Create,
} = q

export default async function nfl(req, res) {
  const {
    query: { draft_name },
  } = req

  const { picks, name, account } = req.body

  if (!picks) {
    res.status(400).json({ message: 'Picks required '})
    return
  }

  if (!name) {
    res.status(400).json({ message: 'Name required '})
    return
  }

  const new_draft = {
    draft_name,
    picks,
    name,
    account,
  }
 
  const collection = 'entries'
  const user = await client.query(
    Create(
      Collection(collection),
      { data: new_draft }
    )
  )

  const user_id = user.ref.id
 
  if (account) {
    const minted = await mint(account)
    res.status(200).json({
      user_id,
      name,
      picks,
      account,
      minted,
    })
    return
  } else {
    res.status(200).json({
      user_id,
      name,
      picks,
    })
    return
  }


}