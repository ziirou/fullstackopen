import { useState } from 'react'
import {
  MainContainer,
  H2Header,
  H3Header,
  CommonButton,
  BadButton,
  Input,
  Table,
  TableData,
} from '../styles'

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
    <MainContainer>
      <H2Header>
        {blog.title} - {blog.author}
      </H2Header>
      <>
        <MainContainer>
          <span>
            URL: <a href={`${blog.url}`}>{blog.url}</a>
          </span>
          <span>Likes: {blog.likes}</span>
          {blog.user && blog.user.name && (
            <span>Added by: {blog.user.name}</span>
          )}
          <CommonButton onClick={() => handleBlogLike(blog)}>Like</CommonButton>
        </MainContainer>

        <H3Header>Comments</H3Header>
        <form onSubmit={handleCommentSubmit}>
          <Input
            type="text"
            value={comment}
            aria-label="Comment"
            onChange={(event) => setComment(event.target.value)}
          />
          <CommonButton type="submit">Add comment</CommonButton>
        </form>

        {blog.comments && blog.comments.length > 0 && (
          <Table>
            <tbody>
              {blog.comments.map((comment) => (
                <tr key={comment.id}>
                  <TableData>{comment.comment}</TableData>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>

      {(!blog.user || blog.user.username === loggedUser) && (
        <BadButton onClick={() => handleBlogRemove(blog)}>
          Remove this blog
        </BadButton>
      )}
    </MainContainer>
  )
}

export default Blog
