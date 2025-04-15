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
          <button className="blog_button" onClick={() => handleBlogLike(blog)}>
            Like
          </button>
        </div>
        {blog.user && blog.user.name && <div>Added by: {blog.user.name}</div>}

        {(!blog.user || blog.user.username === loggedUser) && (
          <button onClick={() => handleBlogRemove(blog)}>Remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
