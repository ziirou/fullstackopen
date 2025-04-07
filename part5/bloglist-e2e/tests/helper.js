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

const likeBlog = async (blog, count) => {
  await blog.getByRole('button', { name: 'View' }).click()

  for (let i = 0; i < count; i++) {
    await blog.getByRole('button', { name: 'Like' }).click()
    await blog.getByText(`Likes: ${i + 1}`).waitFor()
  }
}

export { loginWith, createBlog, likeBlog }
