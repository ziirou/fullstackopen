import { useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  removeBlog,
  likeBlog,
} from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

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
        dispatch(initializeBlogs())
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
  }, [dispatch, handleNotification])

  const handleLogin = ({ username, password }) => {
    dispatch(login(username, password))
  }

  const handleLogout = () => {
    dispatch(logout(user.name))
  }

  const handleBlogCreate = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))

      blogFormRef.current.toggleVisibility()

      if (blogObject.author) {
        handleNotification(
          `New blog created: '${blogObject.title} by ${blogObject.author}'`,
          'notification',
          5000
        )
      } else {
        handleNotification(
          `New blog '${blogObject.title}' created without an author`,
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
      dispatch(removeBlog(blogObject.id))

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
    try {
      dispatch(likeBlog(blogObject))
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
