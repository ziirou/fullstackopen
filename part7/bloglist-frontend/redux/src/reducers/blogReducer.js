import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
  },
})

export const { setBlogs, appendBlog, deleteBlog, updateBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blogObject,
      likes: blogObject.likes + 1,
    })
    updatedBlog.user = blogObject.user
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
