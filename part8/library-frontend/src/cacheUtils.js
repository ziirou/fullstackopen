export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (array) => {
    let uniqueTitlesSet = new Set()
    return array.filter((item) => {
      let key = item.title
      return uniqueTitlesSet.has(key) ? false : uniqueTitlesSet.add(key)
    })
  }

  // Combine genres of the added book with `null` for the unfiltered query
  const genresToUpdate = [...addedBook.genres, null]

  // Update the cache for each genre
  genresToUpdate.forEach((genre) => {
    // Use {} for the unfiltered query
    const variables = genre ? { genre } : {}

    cache.updateQuery({ query, variables }, (data) => {
      if (!data || !data.allBooks) {
        // If the cache for this genre doesn't exist, do nothing
        return undefined
      }

      // Append the new book to the existing list of books
      return {
        allBooks: uniqueByTitle(data.allBooks.concat(addedBook)),
      }
    })
  })
}
