const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog_object) => {
    const likes = blog_object.likes
    return sum + likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}
