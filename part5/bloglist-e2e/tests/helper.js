const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

export { loginWith }
