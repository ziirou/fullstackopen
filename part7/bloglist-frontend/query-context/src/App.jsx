import { useEffect, useRef } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useNotifDispatch } from './context/NotifHooks'
import { useUserValue, useUserDispatch } from './context/UserHooks'

const App = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotifDispatch()
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  const blogFormRef = useRef()

  const handleNotification = (message, notifType, timeout) => {
    notifDispatch({
      type: 'SET',
      payload: {
        message: message,
        type: notifType,
      },
    })
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR', payload: '' })
    }, timeout)
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (createdBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(createdBlog))

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
    },
    onError: (error) => {
      console.log('Blog creation failed:', error)

      handleNotification(
        'Blog creation failed: ' +
          `${error.response.data.error || `status code: ${error.status}`}`,
        'error',
        5000
      )
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, { id, title }) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== id)
      )

      handleNotification(
        `Blog '${title}' successfully removed`,
        'notification',
        5000
      )
    },
    onError: (error) => {
      console.log('Blog removing failed:', error)

      handleNotification(
        'Blog removing failed: ' +
          `${error.response.data.error || `status code: ${error.status}`}`,
        'error',
        5000
      )
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog, { user }) => {
      const blogs = queryClient.getQueryData(['blogs'])
      updatedBlog.user = user
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )

      handleNotification(
        `Liked blog: '${updatedBlog.title}'`,
        'notification',
        5000
      )
    },
    onError: (error) => {
      console.log('Blog updating failed:', error)

      handleNotification(
        'Blog updating failed: ' +
          `${error.response.data.error || `status code: ${error.status}`}`,
        'error',
        5000
      )
    },
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET',
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })
  console.log('result:', JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data.sort((less, more) => more.likes - less.likes)

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))

      userDispatch({
        type: 'SET',
        payload: user,
      })
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
      userDispatch({
        type: 'CLEAR',
      })
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

  const handleBlogCreate = (blogObject) => {
    newBlogMutation.mutate(blogObject)
    blogFormRef.current.toggleVisibility()
  }

  const handleBlogRemove = async (blogObject) => {
    if (
      !confirm(`Remove blog '${blogObject.title}' by '${blogObject.author}'?`)
    ) {
      return
    }

    removeBlogMutation.mutate(blogObject)
  }

  const handleBlogLike = (blogObject) => {
    updateBlogMutation.mutate({ ...blogObject, likes: blogObject.likes + 1 })
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
