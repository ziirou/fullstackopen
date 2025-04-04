const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByRole('textbox', { name: 'Title' }).fill(blog.title)
  await page.getByRole('textbox', { name: 'Author' }).fill(blog.author)
  await page.getByRole('textbox', { name: 'URL' }).fill(blog.url)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(`${blog.title} - ${blog.author}`).waitFor()
}

export { loginWith, createBlog }
