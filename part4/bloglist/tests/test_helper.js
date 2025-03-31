const Blog = require('../models/blog')
const User = require('../models/user')

const initialUser = {
  username: 'initial_user',
  name: 'Initial User',
  //passwordHash: 'added in beforeEach',
  blogs: []
}

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'First Person',
    url: 'first_url',
    likes: 1
  },
  {
    title: 'Second Blog',
    author: 'Second Person',
    url: 'second_url',
    likes: 20
  },
  {
    title: 'Third Blog',
    author: 'Third Person',
    url: 'third_url',
    likes: 300
  }
]

/* Fetch all blogs from the database and convert them to JSON. */
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/* Fetch all users from the database and convert them to JSON. */
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUser,
  initialBlogs,
  blogsInDb,
  usersInDb
}
