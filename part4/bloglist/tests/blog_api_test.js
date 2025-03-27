const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./test_helper')
const Blog = require('../models/blog')

describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
  })

  describe('Fetch all blogs', () => {
    test('Content-Type is application/json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('Blogs are returned as json', async () => {
      const blogs = await testHelper.blogsInDb()

      assert.strictEqual(Array.isArray(blogs), true)

      console.log('blogs:', blogs)

      blogs.forEach(blog => {
        assert.strictEqual(typeof blog.title, 'string')
        assert.strictEqual(typeof blog.author, 'string')
        assert.strictEqual(typeof blog.url, 'string')
        assert.strictEqual(typeof blog.likes, 'number')
      })
    })

    test('All blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, testHelper.initialBlogs.length)
    })

    test('A specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const titles = response.body.map(r => r.title)
      assert(titles.includes('First Blog'))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
