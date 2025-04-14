import { createSlice } from '@reduxjs/toolkit'

// Variable to store the timeout ID
let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: null, id: null },
  reducers: {
    showNotification(_, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
        id: action.payload.id,
      }
    },
    clearNotification(state, action) {
      // Only clear if the IDs match
      if (state.id === action.payload) {
        return { message: '', type: null, id: null }
      }
      return state
    },
  },
})

const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, type, milliseconds) => {
  return async (dispatch) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Generate a unique ID for the notification
    const id = Date.now()

    dispatch(showNotification({ message, type, id }))

    // Set a new timeout and store its ID
    timeoutId = setTimeout(() => {
      dispatch(clearNotification(id))
    }, milliseconds)
  }
}

export default notificationSlice.reducer
