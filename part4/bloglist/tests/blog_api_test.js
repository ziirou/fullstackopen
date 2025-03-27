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

      for (const blog of blogs) {
        assert.strictEqual(typeof blog.title, 'string')
        assert.strictEqual(typeof blog.author, 'string')
        assert.strictEqual(typeof blog.url, 'string')
        assert.strictEqual(typeof blog.likes, 'number')
        assert.strictEqual(typeof blog.id, 'string')
      }
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

    test('Blogs have id instead of _id', async () => {
      const blogs = await testHelper.blogsInDb()

      for (const blog of blogs) {
        assert(blog.id, 'Blog should have an id property')
        assert.strictEqual(typeof blog.id, 'string', 'id should be a string')
        assert.strictEqual('_id' in blog, false, 'Blog should not have _id property')
      }
    })
  })

  describe('Addition of a new blog', () => {
    test('Succeeds with valid data', async () => {
      const newBlog = {
        title: 'Fourth Blog',
        author: 'First Person',
        url: 'fourth_url',
        likes: 444,
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1)

      const addedBlog = response.body
      assert.strictEqual(typeof addedBlog.title, 'string')
      assert.strictEqual(typeof addedBlog.author, 'string')
      assert.strictEqual(typeof addedBlog.url, 'string')
      assert.strictEqual(typeof addedBlog.likes, 'number')
      assert.strictEqual(typeof addedBlog.id, 'string')

      const addedBlogWithoutId = { ...addedBlog }
      delete addedBlogWithoutId.id
      assert.deepStrictEqual(addedBlogWithoutId, newBlog)
    })

    test('Sets likes=0 if likes is missing or not number', async () => {
      const newBlog = {
        title: 'No Number Blog',
        author: 'First Person',
        url: 'blog_url',
        //likes: 'number',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1)

      assert.strictEqual(response.body.likes, 0)
    })

    test('Fails with status code 400 if title is missing', async () => {
      const newBlog = {
        author: 'First Person',
        url: 'blog_url',
        likes: 666,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await testHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length)
    })

    test('Fails with status code 400 if url is missing', async () => {
      const newBlog = {
        title: 'No URL Blog',
        author: 'First Person',
        likes: 666,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await testHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
