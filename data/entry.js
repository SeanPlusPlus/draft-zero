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
  const itemsRyan = _shuffle(items).slice(0, picks)
  const itemsSean = _shuffle(items).slice(0, picks)
  return [
    {
      name: 'Ryan',
      score: 0,
      items: itemsRyan,
      scores: scores(itemsRyan, drafted)
    },
    {
      name: 'Sean',
      score: 0,
      items: itemsSean,
      scores: scores(itemsSean, drafted)
    },
  ]
}

export default entry