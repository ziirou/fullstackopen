import { MainContainer, H2Header, H3Header, Table, TableData } from '../styles'

const User = ({ user }) => {
  if (!user) {
    return null
  } else if (user.blogs.length === 0) {
    return (
      <div>
        <b>{user.name}</b> has no blogs
      </div>
    )
  }

  return (
    <MainContainer>
      <H2Header>{user.name}</H2Header>
      <H3Header>added blogs</H3Header>
      <Table>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <TableData>
                {blog.title} - {blog.author}
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainContainer>
  )
}

export default User
