import _shuffle from 'lodash/shuffle'
import scores from '../utils/scores'

const picks = 5

const updateEntryTotalScore = (entries, name, score) => {
  return entries.map((e) => {
    if (name === e.name) {
      return {
        ...e,
        score: (e.score + score)
      }
    }
    return e
  })
}

const entry = (items, drafted) => {
  const submissions = [
    {
      name: 'Ryan',
    },
    {
      name: 'Sean',
    }
  ]
  return submissions.map((submission) => {
    const { name } = submission
    const entry = _shuffle(items).slice(0, picks)
    const scores = (entry, drafted)
    return {
      name,
      score: 0,
      scores,
      items: entry,
    }
  })
}

export default entry