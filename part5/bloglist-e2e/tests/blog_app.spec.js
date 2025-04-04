const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'test_password'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Log in' }).click()

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByText('Username:Password:Login')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
  })

  describe('Login', () => {
    test('Succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'test_password')

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText('Test User successfully logged in')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await expect(page.getByText('Login failed')).not.toBeVisible()
    })

    test('Fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong_password')

      const errorDiv = page.locator('.error')
      await expect(errorDiv)
        .toContainText('Login failed: invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'test_password')
    })

    test('A new blog can be created', async ({ page }) => {
      const blog = {
        title: 'test blog',
        author: 'test author',
        url: 'test_url'
      }

      await createBlog(page, blog)

      const notifDiv = page.locator('.notification')
      await expect(notifDiv)
        .toContainText('New blog created: \'test blog by test author\'')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(page.getByText('Blog creation failed')).not.toBeVisible()

      await expect(page.getByText('test blog - test author')).toBeVisible()
    })

    describe('When one blog exists', () => {
      beforeEach(async ({ page }) => {
        const blog = {
          title: 'test blog',
          author: 'test author',
          url: 'test_url'
        }

        await createBlog(page, blog)
      })

      test('A blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Like' }).click()

        await expect(page.getByText('Blog editing failed')).not.toBeVisible()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('A blog can be removed', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        page.on('dialog', async dialog => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'Remove' }).click()

        await expect(page.getByText('test blog - test author')).not.toBeVisible()

        const notifDiv = page.locator('.notification')
        await expect(notifDiv).toContainText('Blog \'test blog\' successfully removed')
        await expect(notifDiv).toHaveCSS('border-style', 'solid')
        await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        await expect(page.getByText('Blog removing failed')).not.toBeVisible()
      })
    })
  })
})
