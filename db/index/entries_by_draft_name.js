const faunadb = require('faunadb')

require('dotenv').config()

const FAUNA_SECRET = process.env.FAUNA_SECRET
const q = faunadb.query

const {
  CreateIndex,
  Collection,
} = q

const client = new faunadb.Client({
  secret: FAUNA_SECRET,
  domain: "db.us.fauna.com",
  port: 443,
  scheme: 'https',
})

async function idx() {
  const index = 'entries_by_draft_name'
  const collection = 'entries'
  const new_index = await client.query(
    CreateIndex({
      name: index,
      source: [ Collection(collection) ],
      terms: [
        { field: ['data', 'draft_name'] },
      ],
      values: [
        { field: ['data', 'draft_name'] },
        { field: ['ref'] },
      ]
    })
  )
  console.log(new_index);
}

idx()