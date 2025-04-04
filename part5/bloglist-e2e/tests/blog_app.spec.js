const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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
})
