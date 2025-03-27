const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}
