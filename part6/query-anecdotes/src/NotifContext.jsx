import { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "CLEAR":
        return null
    default:
        return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notification, notifDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotifContext.Provider value={[notification, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  )
}

export const useNotification = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[1]
}

NotifContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotifContext
