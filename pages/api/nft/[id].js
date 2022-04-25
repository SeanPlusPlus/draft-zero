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

const getSvg = (picks) => {
  const text = picks.map((p, i) => (`<text x='10' y='30' font-family='Verdana' font-size='20' fill='white'>${i + 1}. ${p}</text>`)).join('')
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 1000 1000' enable-background='new 0 0 400 400' xml:space='preserve' height='1000px' width='1000px'><rect x='0' y='0' width='1000' height='1000' style='fill: rgb(0, 83, 156);'></rect>${text}</svg>`
}

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

  const { data: {
    name,
    picks,
  }} = draft

  const image_url = getSvg(picks)

  res.status(200).json({
    name,
    image_url,
    number: draft.ref.id,
  })
}
