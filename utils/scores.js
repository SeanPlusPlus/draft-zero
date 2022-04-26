import _findIndex from 'lodash/findIndex'
import { PENALTY } from './penalty'

const scores = (entry, drafted, p) => {
  const penalty = p ? p : PENALTY
 
  return drafted.map((item, idx) => {
    // array is zero-indexed, thus the first pick would be 0
    const position = idx + 1
 
    let index = _findIndex(entry, (i) => (
      i.name === item.name
    ))
   
    if (index === -1) {
      index = penalty
    } else {
      index += 1 // also to handle zero-indexing of array
    }

    const diff = Math.abs(index - position)

    const score = Math.pow(diff, 2)

    return (
      {
        item,
        position,
        score: score,
      }
    )
  })
}

export default scores