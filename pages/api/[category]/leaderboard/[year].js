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
  Map,
  Paginate,
  Documents,
  Lambda,
} = q

async function getDraft(year, category) {
  const collection = 'drafts'
  const drafts = await client.query(
    Map(
      Paginate(Documents(Collection(collection))),
      Lambda(x => q.Get(x))
    )
  )

  return drafts.data
    .filter((d) => (d.data.year === year && d.data.category === category ))
    .map((d) => ({
      id: d.ref.id,
      ...d.data
    }))[0]
}

async function getEntries() {
  const collection = 'entries'
  const picks = await client.query(
    Map(
      Paginate(Documents(Collection(collection))),
      Lambda(x => q.Get(x))
    )
  )

  return picks.data.map((p) => ({
    id: p.ref.id,
    ...p.data
  }))
}

export default async function leaderboard(req, res) {
  const { query: { year, category } } = req
  const draft = await getDraft(year, category.toUpperCase())
  const entries = await getEntries()
  const leaderboard = {
    draft,
    entries,
  }

  res.status(200).json(leaderboard)
}