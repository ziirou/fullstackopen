import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')

const initialState = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
if (initialState && initialState.token) {
  blogService.setToken(initialState.token)
}

const loginSlice = createSlice({
  name: 'loggedUser',
  initialState: initialState,
  reducers: {
    setLogin(_, action) {
      return action.payload
    },
    clearLogin() {
      return null
    },
  },
})

const { setLogin, clearLogin } = loginSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLogin(user))

      dispatch(
        setNotification(
          `${user.name} successfully logged in`,
          'notification',
          5000
        )
      )
    } catch (exception) {
      console.log('Login failed:', exception)

      dispatch(
        setNotification(
          'Login failed: ' +
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

export const logout = (name) => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem('loggedBloglistAppUser')
      blogService.setToken(null)
      dispatch(clearLogin())

      dispatch(
        setNotification(`${name} successfully logged out`, 'notification', 5000)
      )
    } catch (exception) {
      console.log('Logout failed:', exception)

      dispatch(
        setNotification(
          'Logout failed: ' +
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

export default loginSlice.reducer
