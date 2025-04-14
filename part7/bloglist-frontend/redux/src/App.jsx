import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'

import {
  initializeBlogs,
  createBlog,
  removeBlog,
  likeBlog,
} from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { login, logout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.loggedUser)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async ({ username, password }) => {
    dispatch(login(username, password))
  }

  const handleLogout = async () => {
    dispatch(logout(loggedUser.name))
  }

  const handleBlogCreate = async (blogObject) => {
    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()
  }

  const handleBlogRemove = async (blogObject) => {
    if (
      !confirm(`Remove blog '${blogObject.title}' by '${blogObject.author}'?`)
    ) {
      return
    }

    dispatch(removeBlog(blogObject))
  }

  const handleBlogLike = async (blogObject) => {
    dispatch(likeBlog(blogObject))
  }

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification />

      {!loggedUser && (
        <Togglable buttonLabel="Log in">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}

      {loggedUser && (
        <div>
          <b>{loggedUser.name}</b> logged in
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {loggedUser && (
                <div>
                  <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                    <BlogForm handleBlogCreate={handleBlogCreate} />
                  </Togglable>
                  <h2>Blogs</h2>
                  {blogs.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      loggedUser={loggedUser.username}
                      handleBlogLike={handleBlogLike}
                      handleBlogRemove={handleBlogRemove}
                    />
                  ))}
                </div>
              )}
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
