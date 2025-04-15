import { useState } from 'react'
import PropTypes from 'prop-types'
import { H2Header, GoodButton, Input, Form } from '../styles'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    handleLogin({
      username: username,
      password: password,
    })

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <H2Header>Login</H2Header>

      <Form onSubmit={handleSubmit}>
        <div>
          Username:
          <Input
            data-testid="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password:
          <Input
            data-testid="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <GoodButton type="submit">Login</GoodButton>
      </Form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
