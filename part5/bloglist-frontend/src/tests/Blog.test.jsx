import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  test('Renders blog content', () => {
    const blog = {
      title: 'test_blog',
      author: 'test_author',
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('test_blog - test_author')
    expect(div).not.toHaveTextContent('URL:')
    expect(div).not.toHaveTextContent('Likes:')
  })

  test('After clicking the button, details are displayed', async () => {
    const blog = {
      title: 'test_blog',
      author: 'test_author',
      url: 'test_url',
      likes: 100,
      user: {
        username: 'test_user',
        name: 'Test User'
      },
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('test_blog - test_author')
    expect(div).toHaveTextContent('URL: test_url')
    expect(div).toHaveTextContent('Likes: 100')
    expect(div).toHaveTextContent('User: Test User')
  })

  test('Clicking the Like button TWICE calls event handler TWICE', async () => {
    const blog = {
      title: 'test_blog',
      author: 'test_author',
      url: 'test_url',
      likes: 100,
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleBlogLike={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    expect(mockHandler.mock.calls).toHaveLength(0)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
