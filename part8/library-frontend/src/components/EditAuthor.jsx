import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBirthYear, result ] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
  }, [result.data])

  if (authors.length === 0) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <label>
          name:
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option hidden disabled value="">
              select an author
             </option>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

EditAuthor.propTypes = {
  authors: PropTypes.array.isRequired
}

export default EditAuthor
