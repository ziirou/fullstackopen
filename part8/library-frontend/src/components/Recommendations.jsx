import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ show, favoriteGenre }) => {
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre }
  })

  if (!show) {
    return null
  } else if (!favoriteGenre) {
    return <div>you don&apos;t have favorite genre</div>
  }

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{favoriteGenre}</b>

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
    </div>
  )
}

Recommendations.propTypes = {
  show: PropTypes.bool.isRequired,
  favoriteGenre: PropTypes.string,
}

export default Recommendations
