const User = ({ user }) => {
  if (!user) {
    return null
  }

  if (user.blogs.length === 0) {
    return (
      <div>
        <b>{user.name}</b> has no blogs
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
