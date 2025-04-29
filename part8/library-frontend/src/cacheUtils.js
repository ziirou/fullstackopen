export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (array) => {
    let uniqueTitlesSet = new Set()
    return array.filter((item) => {
      let key = item.title
      return uniqueTitlesSet.has(key) ? false : uniqueTitlesSet.add(key)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook)),
    }
  })
}
