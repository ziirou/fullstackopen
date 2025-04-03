import { render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'test_blog',
      author: 'tester'
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('test_blog - tester')
    expect(div).not.toHaveTextContent('URL:')
    expect(div).not.toHaveTextContent('Likes:')
  })
})
