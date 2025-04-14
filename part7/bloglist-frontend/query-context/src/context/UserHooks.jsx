import { useContext } from 'react'
import UserContext from './UserContext'

export const useUserValue = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext)
  return valueAndDispatch[1]
}
