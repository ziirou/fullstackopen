import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useMatch,
} from 'react-router-dom'

import {
  MainContainer,
  MenuBar,
  MenuText,
  MenuLink,
  H1Header,
  BadButton,
} from './styles'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'

import {
  initializeBlogs,
  createBlog,
  removeBlog,
  likeBlog,
  addComment,
} from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { login, logout } from './reducers/loginReducer'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
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
    navigate('/')
  }

  const handleBlogLike = async (blogObject) => {
    dispatch(likeBlog(blogObject))
  }

  const handleNewComment = async (blogObject, commentObject) => {
    dispatch(addComment(blogObject, commentObject))
  }

  const userMatch = useMatch('/users/:id')
  const matchingUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchingBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <MainContainer>
      <H1Header>Bloglist app</H1Header>
      <Notification />

      {!loggedUser && (
        <Togglable buttonLabel="Log in">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}

      {loggedUser && (
        <MenuBar>
          <MenuLink to="/blogs">blogs</MenuLink>
          <MenuLink to="/users">users</MenuLink>
          <MenuText>
            <b>{loggedUser.name}</b> logged in
          </MenuText>
          <BadButton onClick={handleLogout}>Logout</BadButton>
        </MenuBar>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              {loggedUser && (
                <>
                  <BlogList blogs={blogs} />
                  <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                    <BlogForm handleBlogCreate={handleBlogCreate} />
                  </Togglable>
                </>
              )}
            </>
          }
        />
        <Route path="/blogs" element={<Navigate replace to="/" />} />
        <Route
          path="/blogs/:id"
          element={
            <div>
              {loggedUser && (
                <div>
                  <Blog
                    blog={matchingBlog}
                    loggedUser={loggedUser.username}
                    handleBlogLike={handleBlogLike}
                    handleBlogRemove={handleBlogRemove}
                    handleNewComment={handleNewComment}
                  />
                </div>
              )}
            </div>
          }
        />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={matchingUser} />} />
      </Routes>
    </MainContainer>
  )
}

export default App
