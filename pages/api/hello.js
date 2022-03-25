import items from '../../data/items'
import draft from '../../data/draft'
import entry from '../../data/entry'

export default function handler(req, res) {
  res.status(200).json({
    items,
    draft: draft(items),
    entries: entry(items),
  })
}
