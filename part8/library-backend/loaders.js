const DataLoader = require('dataloader')
const Book = require('./models/book')
const Author = require('./models/author')
  
const bookCountLoader = new DataLoader(async (authorIds) => {
  //console.log('Batching book count requests for author IDs:', authorIds)
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: '$author', count: { $sum: 1 } } },
  ])

  const countMap = counts.reduce((acc, { _id, count }) => {
    acc[_id] = count
    return acc
  }, {})

  return authorIds.map((id) => countMap[id] || 0)
})

const authorLoader = new DataLoader(async (authorIds) => {
  //console.log('Batching author requests for IDs:', authorIds)
  const authors = await Author.find({ _id: { $in: authorIds } })

  const authorMap = authors.reduce((acc, author) => {
    acc[author._id] = author
    return acc
  }, {})

  return authorIds.map((id) => authorMap[id] || null)
})

module.exports = { bookCountLoader, authorLoader }
