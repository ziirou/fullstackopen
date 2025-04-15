import { useState } from 'react'

const Blog = ({
  blog,
  loggedUser,
  handleBlogLike,
  handleBlogRemove,
  handleNewComment,
}) => {
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()

    handleNewComment(blog, { comment: comment })

    setComment('')
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <div>
          URL: <a href={`${blog.url}`}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button
            className="blog_like_button"
            onClick={() => handleBlogLike(blog)}
          >
            Like
          </button>
        </div>
        {blog.user && blog.user.name && <div>Added by: {blog.user.name}</div>}

        {(!blog.user || blog.user.username === loggedUser) && (
          <button onClick={() => handleBlogRemove(blog)}>Remove</button>
        )}

        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            aria-label="Comment"
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="submit">Add comment</button>
        </form>

        {blog.comments && blog.comments.length > 0 && (
          <div>
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment.id}>{comment.comment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
