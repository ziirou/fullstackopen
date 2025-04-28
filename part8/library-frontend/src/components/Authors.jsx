import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import EditAuthor from './EditAuthor'
import { ALL_AUTHORS } from '../queries'

const Authors = ({ show, token }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && ( <EditAuthor authors={authors}/> )}
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  token: PropTypes.string,
}

export default Authors
