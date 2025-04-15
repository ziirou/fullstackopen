const Blog = ({ blog, loggedUser, handleBlogLike, handleBlogRemove }) => {
  if (!blog) {
    return null
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

        {blog.comments && blog.comments.length > 0 && (
          <div>
            <h3>Comments</h3>
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
