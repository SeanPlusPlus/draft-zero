export default async function leaderboard(req, res) {
  const {
    query: { year },
  } = req

  res.status(200).json({year})
}