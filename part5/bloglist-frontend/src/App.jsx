import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const handleNotification = (message, type, timeout) => {
    setNotification({
      message: message,
      type: type
    })
    setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (exception) {
        console.log(exception)

        handleNotification(
          `Fetching blogs failed: ${exception.response.data.error || exception.status}`,
          'error', 5000
        )
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      handleNotification(
        `${user.name} successfully logged in`,
        'notification', 5000
      )
    } catch (exception) {
      console.log('Login failed:', exception)

      handleNotification(
        `Login failed: ${exception.response.data.error || exception.status}`,
        'error', 5000
      )
    }
  }

  const handleLogout = () => {
    try {
      const logoutUser = user.name
      window.localStorage.removeItem('loggedBloglistAppUser')
      setUser(null)
      blogService.setToken(null)

      handleNotification(
        `${logoutUser} successfully logged out`,
        'notification', 5000
      )
    } catch (exception) {
      console.log('Logout failed:', exception)

      handleNotification(
        `Logout failed: ${exception.response.data.error || exception.status}`,
        'error', 5000
      )
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }

      const createdBlog = await blogService.create(blogObject)

      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')

      if (createdBlog.author) {
        handleNotification(
          `New blog created: '${createdBlog.title} by ${createdBlog.author}'`,
          'notification', 5000
        )
      } else {
        handleNotification(
          `New blog '${createdBlog.title}' created without an author`,
          'warning', 5000
        )
      }
    } catch (exception) {
      console.log('Blog creation failed:', exception)

      handleNotification(
        `Blog creation failed: ${exception.response.data.error || exception.status}`,
        'error', 5000
      )
    }
  }

  return (
    <div>
      <Notification notification={notification} />

      {!user &&
        <Togglable buttonLabel="Log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }

      {user &&
        <div>
          <b>{user.name}</b> logged in
          <button className='logout'
            onClick={handleLogout}>
            Logout
          </button>

          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleSubmit={handleCreateBlog}
            />
          </Togglable>

          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
