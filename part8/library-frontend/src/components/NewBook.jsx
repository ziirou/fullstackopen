import { useState } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const errors = error.graphQLErrors
        .map((e) => {
          const extensionMessage = e.extensions?.error?.message
          return extensionMessage
            ? `${e.message}: ${extensionMessage}`
            : e.message
        })
        .join('\n')
      console.log('Adding book failed:', errors)
    },
    update: (cache, response) => {
      const addedBook = response.data.addBook

      // Combine genres of the added book with `null` for the unfiltered query
      const genresToUpdate = [...addedBook.genres, null]

      // Update the cache for each genre
      genresToUpdate.forEach((genre) => {
         // Use {} for the unfiltered query
        const variables = genre ? { genre } : {}
        cache.updateQuery(
          { query: ALL_BOOKS, variables },
          (data) => {
            if (!data || !data.allBooks) {
              // If the cache for this genre doesn't exist, do nothing
              return undefined
            }

            // Append the new book to the existing list of books
            return {
              allBooks: data.allBooks.concat(addedBook),
            }
          }
        )
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default NewBook
