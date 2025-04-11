const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(testHelper.initialUser.password, 10)
    const user = new User({
      username: testHelper.initialUser.username,
      name: testHelper.initialUser.name,
      passwordHash: passwordHash,
      blogs: [],
    })

    await user.save()

    // Login to get token
    const loginResponse = await api
      .post('/api/login')
      .send(testHelper.initialUser)
    token = loginResponse.body.token

    // Add user ID to each initial blog
    const blogsWithUser = testHelper.initialBlogs.map((blog) => ({
      ...blog,
      user: user._id.toString(),
    }))

    await Blog.insertMany(blogsWithUser)
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
        assert.strictEqual(typeof blog.user, 'object')
      }
    })

    test('All blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, testHelper.initialBlogs.length)
    })

    test('A specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const titles = response.body.map((r) => r.title)
      assert(titles.includes('First Blog'))
    })

    test('Blogs have id instead of _id', async () => {
      const blogs = await testHelper.blogsInDb()

      for (const blog of blogs) {
        assert(blog.id, 'Blog should have an id property')
        assert.strictEqual(typeof blog.id, 'string', 'id should be a string')
        assert.strictEqual(
          '_id' in blog,
          false,
          'Blog should not have _id property'
        )
      }
    })
  })

  describe('Addition of a new blog', () => {
    test('Succeeds with status code 201 with valid data', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'New Person',
        url: 'new_url',
        likes: 444,
      }

      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
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
      assert.strictEqual(typeof addedBlog.user, 'object')

      delete addedBlog.id
      delete addedBlog.user
      assert.deepStrictEqual(addedBlog, newBlog)
    })

    test('Sets likes=0 if likes is missing or not number', async () => {
      const newBlog = {
        title: 'No Number Blog',
        author: 'No Number Person',
        url: 'no_number_url',
        //likes: 'number',
      }

      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1)

      assert.strictEqual(response.body.likes, 0)
    })

    test('Fails with status code 401 if token is missing', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'New Person',
        url: 'new_url',
        likes: 666,
      }

      await api.post('/api/blogs').send(newBlog).expect(401)
    })

    test('Fails with status code 400 if title is missing', async () => {
      const newBlog = {
        author: 'New Person',
        url: 'new_url',
        likes: 666,
      }

      await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await testHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length)
    })

    test('Fails with status code 400 if url is missing', async () => {
      const newBlog = {
        title: 'No URL Blog',
        author: 'No URL Person',
        likes: 666,
      }

      await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await testHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length)
    })
  })

  describe('Deletion of a blog', () => {
    test('Succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await testHelper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204)

      const blogsAtEnd = await testHelper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('Fails with status code 401 if token is missing', async () => {
      const blogsAtStart = await testHelper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)
    })
  })

  describe('Editing a blog', () => {
    test('Succeeds with status code 200 with valid data', async () => {
      const blogsAtStart = await testHelper.blogsInDb()

      const idBlogToEdit = blogsAtStart[0].id
      const editedBlog = {
        title: 'Edited Blog',
        author: 'Edited Person',
        url: 'edited_url',
        likes: 888,
      }

      const response = await api
        .put(`/api/blogs/${idBlogToEdit}`)
        .send(editedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const updatedBlog = response.body
      delete updatedBlog.id
      delete updatedBlog.user
      assert.deepStrictEqual(updatedBlog, editedBlog)
    })

    test('Fails with status code 400 if id is invalid', async () => {
      const invalidId = '67e3a3b9b5d42fe75af929'

      await api.put(`/api/blogs/${invalidId}`).expect(400)
    })

    test('Fails with status code 404 if id is missing', async () => {
      const missingId = '67e41aa5c7dac7fedfabf18b'

      await api.put(`/api/blogs/${missingId}`).expect(404)
    })

    test('Fails with status code 400 if data invalid', async () => {
      const blogsAtStart = await testHelper.blogsInDb()

      const idBlogToEdit = blogsAtStart[0].id
      const editedBlog = {
        author: null,
        url: null,
        likes: 'invalid',
      }

      const response = await api
        .put(`/api/blogs/${idBlogToEdit}`)
        .send(editedBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.notDeepStrictEqual(response.body, blogsAtStart[0])

      assert('error' in response.body)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
