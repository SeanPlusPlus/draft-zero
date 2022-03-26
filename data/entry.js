import _shuffle from 'lodash/shuffle'
import _orderBy from 'lodash/orderBy'
import scores from '../utils/scores'

const picks = 5

const entry = (items, drafted) => {
  const entries = [
    {
      name: 'Ryan',
    },
    {
      name: 'Sean',
    }
  ]
  const submissions = entries.map((submission) => {
    const { name } = submission
    const entry = _shuffle(items).slice(0, picks)
    const result = scores(entry, drafted)
    const total = result.reduce((a, b) => ({ score: a.score + b.score}))
    const { score } = total
    return {
      name,
      score,
      items: entry,
      scores: result,
    }
  })
  const ordered = _orderBy(submissions, ['score'], ['asc'])
  return ordered
}

export default entry