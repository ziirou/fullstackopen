const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

describe('When there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'initial_user', passwordHash })

    await user.save()
  })

  describe('Fetch initial user', () => {
    test('Content-Type is application/json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('The user is returned', async () => {
      const response = await api.get('/api/users')

      assert.strictEqual(response.body.length, 1)
    })
  })

  describe('User creation', () => {
    test('Succeeds with status code 201 if new user', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        username: 'new_user',
        name: 'New User',
        password: 'secret_password',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('Fails with status code 400 if username is missing', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        name: 'New User',
        password: 'secret_password',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert(response.body.error.includes('username is missing'))
    })

    test('Fails with status code 400 if password is missing', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        username: 'new_user',
        name: 'New User',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert(response.body.error.includes('password is missing'))
    })

    test('Fails with status code 400 if username is too short', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        username: '12',
        name: 'New User',
        password: 'secret_password',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert(response.body.error.includes('username is too short'))
    })

    test('Fails with status code 400 if password is too short', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        username: 'new_user',
        name: 'New User',
        password: '12',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert(response.body.error.includes('password is too short'))
    })

    test('Fails with proper status code and message if username already taken', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        username: 'initial_user',
        name: 'Initial User',
        password: 'secret_password',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert(response.body.error.includes('expected `username` to be unique'))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
