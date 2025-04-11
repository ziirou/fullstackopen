import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const handleNotification = useCallback(
    (message, type, timeout) => {
      dispatch(setNotification(message, type, timeout))
    },
    [dispatch]
  )

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAll()
        setBlogs(
          [...fetchedBlogs].sort((less, more) => more.likes - less.likes)
        )
      } catch (exception) {
        console.log(exception)

        handleNotification(
          'Fetching blogs failed: ' +
            `${
              exception.response.data.error ||
              `status code: ${exception.status}`
            }`,
          'error',
          5000
        )
      }
    }

    fetchBlogs()
  }, [handleNotification])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)

      handleNotification(
        `${user.name} successfully logged in`,
        'notification',
        5000
      )
    } catch (exception) {
      console.log('Login failed:', exception)

      handleNotification(
        'Login failed: ' +
          `${
            exception.response.data.error || `status code: ${exception.status}`
          }`,
        'error',
        5000
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
        'notification',
        5000
      )
    } catch (exception) {
      console.log('Logout failed:', exception)

      handleNotification(
        'Logout failed: ' +
          `${
            exception.response.data.error || `status code: ${exception.status}`
          }`,
        'error',
        5000
      )
    }
  }

  const handleBlogCreate = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)

      blogFormRef.current.toggleVisibility()
      /* No need to sort here as the new one goes to the bottom. */
      setBlogs(blogs.concat(createdBlog))

      if (createdBlog.author) {
        handleNotification(
          `New blog created: '${createdBlog.title} by ${createdBlog.author}'`,
          'notification',
          5000
        )
      } else {
        handleNotification(
          `New blog '${createdBlog.title}' created without an author`,
          'warning',
          5000
        )
      }
    } catch (exception) {
      console.log('Blog creation failed:', exception)

      handleNotification(
        'Blog creation failed: ' +
          `${
            exception.response.data.error || `status code: ${exception.status}`
          }`,
        'error',
        5000
      )
    }
  }

  const handleBlogRemove = async (blogObject) => {
    if (
      !confirm(`Remove blog '${blogObject.title}' by '${blogObject.author}'?`)
    ) {
      return
    }

    try {
      await blogService.remove(blogObject.id)

      setBlogs((blogs) => blogs.filter((blog) => blog.id !== blogObject.id))

      handleNotification(
        `Blog '${blogObject.title}' successfully removed`,
        'notification',
        5000
      )
    } catch (exception) {
      console.log('Blog removing failed:', exception)

      handleNotification(
        'Blog removing failed: ' +
          `${
            exception.response.data.error || `status code: ${exception.status}`
          }`,
        'error',
        5000
      )
    }
  }

  const handleBlogLike = async (blogObject) => {
    const editedBlog = { ...blogObject, likes: blogObject.likes + 1 }

    try {
      await blogService.update(editedBlog)
      /* Blog component needs other user information
          in addition to user id, so let's not use the returned blog. */
      setBlogs(
        [...blogs]
          .map((blog) => (blog.id !== blogObject.id ? blog : editedBlog))
          .sort((less, more) => more.likes - less.likes)
      )
    } catch (exception) {
      console.log('Blog editing failed:', exception)

      handleNotification(
        'Blog editing failed: ' +
          `${
            exception.response.data.error || `status code: ${exception.status}`
          }`,
        'error',
        5000
      )
    }
  }

  return (
    <div>
      <Notification />

      {!user && (
        <Togglable buttonLabel="Log in">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}

      {user && (
        <div>
          <b>{user.name}</b> logged in
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm handleBlogCreate={handleBlogCreate} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              loggedUser={user.username}
              handleBlogLike={handleBlogLike}
              handleBlogRemove={handleBlogRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
