import items from '../../data/items'
import draft from '../../data/draft'
import entry from '../../data/entry'

export default function handler(req, res) {
  const drafted = draft(items)
  res.status(200).json({
    items,
    draft: drafted,
    entries: entry(items, drafted),
  })
}
