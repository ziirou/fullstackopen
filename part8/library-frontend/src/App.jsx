import { useState, useEffect } from "react"
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"
import Login from './components/Login'
import { updateCache } from './cacheUtils'
import { ME, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")
  const client = useApolloClient()
  const loggedUser = useQuery(ME, {
    skip: !token, // Only run query if the token is available
  })

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCache(client.cache, ALL_BOOKS, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("login")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>recommendations</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />

      <Recommendations
        show={page === "recommendations"}
        favoriteGenre={loggedUser?.data?.me?.favoriteGenre}
      />

      {token && page === "login" ?
        setPage("authors") : (
          <Login show={page === "login"} setToken={setToken} />
        )
      }
    </div>
  );
};

export default App
