import { createSlice } from '@reduxjs/toolkit'

const getId = () => Number((100000 * Math.random()).toFixed(0))

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      const content = action.payload
      state.push(asObject(content))
    },
    voteAnecdote(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state
        .map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
        .sort((less, more) => more.votes - less.votes)
    },
    setAnecdotes(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      return action.payload
    }
  }
})

export const {
  createAnecdote,
  voteAnecdote,
  setAnecdotes
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
