export default async function nfl(req, res) {
  const {
    query: { year },
  } = req

  const { picks, name } = req.body

  res.status(200).json({
    year,
    name,
    picks,
  })
}