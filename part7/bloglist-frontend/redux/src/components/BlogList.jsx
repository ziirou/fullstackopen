import {
  MainContainer,
  StyledLink,
  H2Header,
  Table,
  TableData,
} from '../styles'

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return null
  } else if (blogs.length === 0) {
    return <div>no blogs</div>
  }

  return (
    <MainContainer>
      <H2Header>Blogs</H2Header>
      <Table>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <TableData>
                <StyledLink to={`/blogs/${blog.id}`}>
                  {blog.title} - {blog.author}
                </StyledLink>
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainContainer>
  )
}

export default BlogList
