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
  Get,
  Ref,
  Select,
  Match,
  Index,
  Collection,
  Map,
  Paginate,
  Documents,
  Lambda,
} = q

async function getDraft(name) {
  const index = 'drafts_by_name'
  const item = await client.query(
    Select([0],
      Paginate(
        Match(
          Index(index),
          name
        )
      )
    )
  )
  const ref = item[1].value.id
  const collection = 'drafts'
  const draft = await client.query(
    Get(
      Ref(
        Collection(collection),
        ref
      )
    )
  )

  return draft.data
}

async function getEntries(name, draft) {
  const collection = 'entries'
  const entries = await client.query(
    Map(
      Paginate(Documents(Collection(collection))),
      Lambda(x => q.Get(x))
    )
  )

  const { items } = draft
  const names = items.map((name) => ({name}))

  return entries.data.map((e) => ({
    id: e.ref.id,
    ...e.data,
    score: 0,
    scores: names
  }))
}

export default async function leaderboard(req, res) {
  const {
    query: { draft_name },
  } = req
  const draft = await getDraft(draft_name)
  const entries = await getEntries(draft_name, draft)
  const leaderboard = {
    draft,
    entries,
  }

  res.status(200).json(leaderboard)
}