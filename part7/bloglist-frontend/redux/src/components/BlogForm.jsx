import { useState } from 'react'
import PropTypes from 'prop-types'
import { H2Header, GoodButton, Input, Form } from '../styles'

const BlogForm = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    handleBlogCreate({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <H2Header>Create new blog</H2Header>
      <Form onSubmit={handleSubmit}>
        <div>
          Title:
          <Input
            type="text"
            value={title}
            aria-label="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <Input
            type="text"
            value={author}
            aria-label="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <Input
            type="text"
            value={url}
            aria-label="URL"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <GoodButton type="submit">Create</GoodButton>
      </Form>
    </>
  )
}

BlogForm.propTypes = {
  handleBlogCreate: PropTypes.func.isRequired,
}

export default BlogForm
