import _findIndex from 'lodash/findIndex'

const penalty = 10

const scores = (items, drafted) => {
  return drafted.map((item, position) => {
    let index = _findIndex(items, (i) => (
      i.name === item.name
    ))
   
    if (index === -1) {
      index = penalty 
    }

    const diff = Math.abs(index - position)

    const score = Math.pow(diff, 2)

    return (
      {
        score: score,
        floor: null,   // TODO
        ceiling: null, // TODO
      }
    )
  })
}

export default scores