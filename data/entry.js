import _shuffle from 'lodash/shuffle'

const picks = 5

const entry = (items) => {
  return [
    {
      name: 'Ryan',
      items: _shuffle(items).slice(0, picks)
    },
    {
      name: 'Sean',
      items: _shuffle(items).slice(0, picks)
    },
  ]
}

export default entry