import { useState } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ALL_BOOKS } from '../queries'

let genres = []

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: selectedGenre ? { genre: selectedGenre } : {},
  })

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  if (!selectedGenre) {
    genres = [...new Set(books.flatMap(book => book.genres))]
  }

  const selectedButtonStyle = {
    borderWidth: '3px',
    backgroundColor: 'honeydew',
    fontWeight: 'bold'
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? (
          <>in genre: <b>{selectedGenre}</b></>
        ) : <b>all genres</b>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)}
          style={selectedGenre === genre ? selectedButtonStyle : null}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => setSelectedGenre(null)}
        style={!selectedGenre ? selectedButtonStyle
          : { borderWidth: '1px', backgroundColor: 'azure' }
        }
      >
        all genres
      </button>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Books
