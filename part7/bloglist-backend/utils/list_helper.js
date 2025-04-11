const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  // Reducer function to sum all likes
  const sumReducer = (sum, blog) => {
    const likes = blog.likes
    return sum + likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(sumReducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  // Reducer function to find blog with the most likes
  const maxReducer = (max, blog) => {
    return blog.likes > max.likes
      ? blog
      : max
  }

  // Find the blog with the most likes
  const favorite = blogs.reduce(maxReducer, blogs[0])

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  // Reducer function to count blogs per author
  const countReducer = (count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1
    return count
  }

  // Reduce blogs array into an object { authorName: blogCount }
  const authorsWithBlogs = blogs.reduce(countReducer, {})

  // Reducer function to find the author with the most blogs
  const maxReducer = (max, author) => {
    return authorsWithBlogs[author] > authorsWithBlogs[max]
      ? author
      : max
  }

  // Find the author with the most blogs by reducing over the keys (authors)
  const maxAuthor = Object.keys(authorsWithBlogs)
    .reduce(maxReducer, Object.keys(authorsWithBlogs)[0])

  return {
    author: maxAuthor,
    blogs: authorsWithBlogs[maxAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  // Reducer function to count likes of blogs per author
  const countReducer = (count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes
    return count
  }

  // Reduce blogs array into an object { authorName: likeCount }
  const authorsWithLikes = blogs.reduce(countReducer, {})

  // Reducer function to find the author with the most likes
  const maxReducer = (max, author) => {
    return authorsWithLikes[author] > authorsWithLikes[max]
      ? author
      : max
  }

  // Find the author with the most likes by reducing over the keys (authors)
  const maxAuthor = Object.keys(authorsWithLikes)
    .reduce(maxReducer, Object.keys(authorsWithLikes)[0])

  return {
    author: maxAuthor,
    likes: authorsWithLikes[maxAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
