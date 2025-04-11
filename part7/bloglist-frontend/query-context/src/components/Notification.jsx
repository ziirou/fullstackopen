import { useNotification } from '../context/NotifHooks'

const Notification = () => {
  const notification = useNotification()

  if (!notification) {
    return null
  }

  return (
    <div className={`notifications ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification
