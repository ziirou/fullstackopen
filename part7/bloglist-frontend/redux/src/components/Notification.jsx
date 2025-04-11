import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  return (
    <div className={`notifications ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification
