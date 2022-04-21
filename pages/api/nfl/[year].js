export default async function nfl(req, res) {
  const {
    query: { year },
  } = req

  const picks = req.body

  res.status(200).json({
    year,
    picks,
  })
}