import { useSelector } from 'react-redux'
import { NotificationDiv } from '../styles'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  return (
    <NotificationDiv $type={notification.type}>
      {notification.message}
    </NotificationDiv>
  )
}

export default Notification
