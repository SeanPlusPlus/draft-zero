import _findIndex from 'lodash/findIndex'
import { PENALTY } from './penalty'

const scores = (entry, drafted) => {
  return drafted.map((item, idx) => {
    const position = idx + 1
 
    let index = _findIndex(entry, (i) => (
      i.name === item.name
    ))
   
    if (index === -1) {
      index = PENALTY
    } else {
      index += 1
    }

    const diff = Math.abs(index - position)

    const score = Math.pow(diff, 2)

    return (
      {
        item,
        position,
        score: score,
        floor: null,   // TODO
        ceiling: null, // TODO
      }
    )
  })
}

export default scores