import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  test('Updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const handleBlogCreate = vi.fn()

    render(<BlogForm handleBlogCreate={handleBlogCreate} />)

    const titleInput = screen.getByRole('textbox', { name: /Title/i })
    const authorInput = screen.getByRole('textbox', { name: /Author/i })
    const urlInput = screen.getByRole('textbox', { name: /URL/i })
    const createButton = screen.getByRole('button', { name: /Create/i })

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test_url')
    await user.click(createButton)

    expect(handleBlogCreate.mock.calls).toHaveLength(1)
    expect(handleBlogCreate.mock.calls[0][0].title).toBe('test title')
    expect(handleBlogCreate.mock.calls[0][0].author).toBe('test author')
    expect(handleBlogCreate.mock.calls[0][0].url).toBe('test_url')
  })
})
