import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { setNotification } from '../reducers/notificationReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload
    },
  },
})

const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch(setUsers(users))
    } catch (exception) {
      console.log('Fetching users failed:', exception)

      dispatch(
        setNotification(
          'Fetching users failed: ' +
            `${
              exception.response.data.error ||
              `status code: ${exception.status}`
            }`,
          'error',
          5000
        )
      )
    }
  }
}

export default userSlice.reducer
