import { useContext } from 'react'
import NotifContext from './NotifContext'

export const useNotification = () => {
  const [notification] = useContext(NotifContext)
  return notification
}

export const useNotifDispatch = () => {
  const valueAndDispatch = useContext(NotifContext)
  return valueAndDispatch[1]
}
