import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      return action.payload
    },
    clearNotification(state, action) {
      console.log('STATE:', JSON.parse(JSON.stringify(state)))
      console.log('ACTION:', JSON.parse(JSON.stringify(action)))

      return null
    }
  }
})

const {
  showNotification,
  clearNotification
} = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
