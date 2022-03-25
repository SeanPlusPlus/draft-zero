import _shuffle from 'lodash/shuffle'

const picks = 5

const draft = (items) => {
  return _shuffle(items).slice(0, picks)
}

export default draft