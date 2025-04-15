import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return null
  } else if (blogs.length === 0) {
    return <div>no blogs</div>
  }

  return (
    <div>
      <h2>Blogs</h2>
      <table>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="blog">
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} - {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BlogList
