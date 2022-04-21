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
  Get,
  Ref,
} = q

export default async function entry(req, res) {
  const { query: { id } } = req
  const collection = 'drafts'
  const draft = await client.query(
    Get(
      Ref(
        Collection(collection),
        id
      )
    )
  )

  res.status(200).json({
    ...draft.data
  })
}
