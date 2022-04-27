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
  Select,
  Paginate,
  Match,
  Index,
  Get,
  Ref,
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

  const d = await getDraft(draft_name)
  if (d.closed) {
    res.status(400).json({
      message: 'Draft closed',
      error: true,
    })
    return
  } else { // draft is open
    const new_draft = {
      draft_name,
      picks,
      name,
      account,
    }
  
    const collection = 'entries'
    const draft = await client.query(
      Create(
        Collection(collection),
        { data: new_draft }
      )
    )

    const draft_id = draft.ref.id
  
    if (account) {
      const minted = await mint(account, draft_id)
      res.status(200).json({
        draft_id,
        name,
        picks,
        account,
        minted,
      })
      return
    } else {
      res.status(200).json({
        draft_id,
        name,
        picks,
      })
      return
    }
  }
}