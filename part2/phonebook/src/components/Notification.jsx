const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={`notifications ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification
