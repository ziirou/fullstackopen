const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

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
    await request.post('/api/users', {
      data: {
        name: 'Other User',
        username: 'other_user',
        password: 'other_password'
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

    describe('When several blogs exist', () => {
      beforeEach(async ({ page }) => {
        const first_blog = {
          title: 'first blog',
          author: 'first author',
          url: 'first_url'
        }
        const second_blog = {
          title: 'second blog',
          author: 'second author',
          url: 'second_url'
        }
        const third_blog = {
          title: 'third blog',
          author: 'third author',
          url: 'third_url'
        }

        await createBlog(page, first_blog)
        await createBlog(page, second_blog)
        await createBlog(page, third_blog)
      })

      test('All of them exist', async ({ page }) => {
        const blogDiv = page.locator('.blog')
        await expect(blogDiv.getByText('first blog - first author')).toBeVisible()
        await expect(blogDiv.getByText('second blog - second author')).toBeVisible()
        await expect(blogDiv.getByText('third blog - third author')).toBeVisible()
      })

      test('A blog can be liked', async ({ page }) => {
        const firstBlog = page.locator('.blog').getByText('first blog - first author')
        await likeBlog(firstBlog, 1)

        await expect(firstBlog.getByText('Blog editing failed')).not.toBeVisible()
        await expect(firstBlog.getByText('Likes: 1')).toBeVisible()
      })

      test('A blog can be removed', async ({ page }) => {
        const firstBlog = page.locator('.blog').getByText('first blog - first author')
        await firstBlog.getByRole('button', { name: 'View' }).click()
        page.on('dialog', async dialog => {
          await dialog.accept()
        })
        await firstBlog.getByRole('button', { name: 'Remove' }).click()

        await expect(firstBlog.getByText('first blog - first author')).not.toBeVisible()

        const notifDiv = page.locator('.notification')
        await expect(notifDiv).toContainText('Blog \'first blog\' successfully removed')
        await expect(notifDiv).toHaveCSS('border-style', 'solid')
        await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        await expect(page.getByText('Blog removing failed')).not.toBeVisible()
      })

      test('Non-creator can\t see the remove button', async ({ page }) => {
        const firstBlog = page.locator('.blog').getByText('first blog - first author')
        await firstBlog.getByRole('button', { name: 'View' }).click()
        await expect(firstBlog.getByRole('button', { name: 'Remove' })).toBeVisible()

        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'other_user', 'other_password')

        await firstBlog.getByRole('button', { name: 'View' }).click()
        await expect(firstBlog.getByRole('button', { name: 'Remove' })).not.toBeVisible()
      })

      test('Blogs are sorted by likes', async ({ page }) => {
        const blogDiv = page.locator('.blog')

        const firstBlog = blogDiv.getByText('first blog - first author')
        await likeBlog(firstBlog, 1)

        const secondBlog = blogDiv.getByText('second blog - second author')
        await likeBlog(secondBlog, 2)

        const thirdBlog = blogDiv.getByText('third blog - third author')
        await likeBlog(thirdBlog, 3)

        const blogs = await page.locator('.blog').all()

        await expect(blogs[0]).toContainText('third blog')
        await expect(blogs[1]).toContainText('second blog')
        await expect(blogs[2]).toContainText('first blog')
      })
    })
  })
})
