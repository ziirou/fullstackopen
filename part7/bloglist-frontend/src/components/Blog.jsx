import { useState } from 'react'

const Blog = ({ blog, loggedUser, handleBlogLike, handleBlogRemove }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="blog">
      {blog.title} - {blog.author}
      <button
        className="blog_button"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide' : 'View'}
      </button>
      {showDetails && (
        <div>
          <div>URL: {blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button
              className="blog_button"
              onClick={() => handleBlogLike(blog)}
            >
              Like
            </button>
          </div>
          {blog.user && blog.user.name && <div>User: {blog.user.name}</div>}

          {(!blog.user || blog.user.username === loggedUser) && (
            <button onClick={() => handleBlogRemove(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
