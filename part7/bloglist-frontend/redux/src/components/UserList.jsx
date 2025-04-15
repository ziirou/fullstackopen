import { MainContainer, StyledLink, H2Header, Table } from '../styles'

const UserList = ({ users }) => {
  if (!users) {
    return null
  } else if (users.length === 0) {
    return <div>no users</div>
  }

  return (
    <MainContainer>
      <H2Header>Users</H2Header>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainContainer>
  )
}

export default UserList
