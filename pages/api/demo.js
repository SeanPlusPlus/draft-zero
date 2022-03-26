import items from '../../data/items'
import draft from '../../data/draft'
import entry from '../../data/entry'
import { PENALTY } from '../../utils/penalty'

export default function handler(req, res) {
  const drafted = draft(items)
  res.status(200).json({
    items,
    draft: drafted,
    entries: entry(items, drafted),
    PENALTY,
  })
}
