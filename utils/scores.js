import _findIndex from 'lodash/findIndex'
import { PENALTY } from './penalty'

const scores = (entry, drafted) => {
  return drafted.map((item, position) => {
    let index = _findIndex(entry, (i) => (
      i.name === item.name
    ))
   
    if (index === -1) {
      index = PENALTY
    }

    const diff = Math.abs(index - position)

    const score = Math.pow(diff, 2)

    return (
      {
        item,
        score: score,
        floor: null,   // TODO
        ceiling: null, // TODO
      }
    )
  })
}

export default scores