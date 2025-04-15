import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, action) {
      return action.payload.sort((less, more) => more.likes - less.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      return state
        .map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
        .sort((less, more) => more.likes - less.likes)
    },
    commentBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
  },
})

const { setBlogs, appendBlog, deleteBlog, updateBlog, commentBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (exception) {
      console.log('Fetching blogs failed:', exception)

      dispatch(
        setNotification(
          'Fetching blogs failed: ' +
            `${
              exception.response.data.error ||
              `status code: ${exception.status}`
            }`,
          'error',
          5000
        )
      )
    }
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))

      if (newBlog.author) {
        dispatch(
          setNotification(
            `New blog created: '${newBlog.title} by ${newBlog.author}'`,
            'notification',
            5000
          )
        )
      } else {
        dispatch(
          setNotification(
            `New blog '${newBlog.title}' created without an author`,
            'warning',
            5000
          )
        )
      }
    } catch (exception) {
      console.log('Blog creation failed:', exception)

      dispatch(
        setNotification(
          'Blog creation failed: ' +
            `${
              exception.response.data.error ||
              `status code: ${exception.status}`
            }`,
          'error',
          5000
        )
      )
    }
  }
}

export const removeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogObject.id)
      dispatch(deleteBlog(blogObject.id))

      dispatch(
        setNotification(
          `Blog '${blogObject.title}' successfully removed`,
          'notification',
          5000
        )
      )
    } catch (exception) {
      console.log('Blog removing failed:', exception)

      dispatch(
        setNotification(
          'Blog removing failed: ' +
            `${
              exception.response.data.error ||
              `status code: ${exception.status}`
            }`,
          'error',
          5000
        )
      )
    }
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({
        ...blogObject,
        likes: blogObject.likes + 1,
      })
      updatedBlog.user = blogObject.user
      updatedBlog.comments = blogObject.comments
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      console.log('Blog editing failed:', exception)

      dispatch(
        setNotification(
          'Blog editing failed: ' +
            `${
              exception.response.data.error ||
              `status code: ${exception.status}`
            }`,
          'error',
          5000
        )
      )
    }
  }
}

export const addComment = (blogObject, commentObject) => {
  return async (dispatch) => {
    try {
      const newComment = await blogService.addComment(
        blogObject.id,
        commentObject
      )
      const commentedBlog = {
        ...blogObject,
        comments: [
          ...blogObject.comments,
          { comment: newComment.comment, id: newComment.id },
        ],
      }
      dispatch(commentBlog(commentedBlog))

      dispatch(
        setNotification(
          `New comment added: '${commentObject.comment}'`,
          'notification',
          5000
        )
      )
    } catch (exception) {
      console.log('Comment addition failed:', exception)

      dispatch(
        setNotification(
          'Comment addition failed: ' +
            `${
              exception.response.data.error ||
              `status code: ${exception.status}`
            }`,
          'error',
          5000
        )
      )
    }
  }
}

export default blogSlice.reducer
