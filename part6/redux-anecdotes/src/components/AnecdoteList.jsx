import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    }
  })

  const vote = async (anecdoteToVote) => {
    dispatch(voteAnecdote(anecdoteToVote))
    dispatch(setNotification(`VOTED '${anecdoteToVote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.length > 0 && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
