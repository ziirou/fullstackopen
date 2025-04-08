import { createSlice } from '@reduxjs/toolkit'

// Variable to store the timeout ID
let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', id: null },
  reducers: {
    showNotification(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      return {
        message: action.payload.message,
        id: action.payload.id
      }
    },
    clearNotification(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      // Only clear if the IDs match
      if (state.id === action.payload) {
        return { message: '', id: null }
      }
      return state
    }
  }
})

const {
  showNotification,
  clearNotification
} = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

     // Generate a unique ID for the notification
    const id = Date.now()

    dispatch(showNotification({ message, id }))

    // Set a new timeout and store its ID
    timeoutId = setTimeout(() => {
      dispatch(clearNotification(id))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
