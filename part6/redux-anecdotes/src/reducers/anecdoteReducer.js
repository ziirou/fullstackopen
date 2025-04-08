import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      return state
        .map(anecdote =>
          anecdote.id !== action.payload.id ? anecdote : action.payload
        )
        .sort((less, more) => more.votes - less.votes)
    },
    appendAnecdote(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      return action.payload.sort((less, more) => more.votes - less.votes)
    }
  }
})

export const {
  updateAnecdote,
  appendAnecdote,
  setAnecdotes
} = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = object => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({
      ...object,
      votes: object.votes + 1
    })
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
