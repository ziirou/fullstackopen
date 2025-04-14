import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, 0)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext
