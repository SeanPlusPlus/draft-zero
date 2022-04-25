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
  Create,
} = q

export default async function nfl(req, res) {
  const {
    query: { year },
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
    category: 'NFL',
    year,
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

  const id = user.ref.id

  res.status(200).json({
    id,
    year,
    name,
    picks,
    account,
  })
}