import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        //console.log('promise fulfilled')
        setCountries(response.data)
        //console.log('got', response.data.length, 'countries')
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleNewFilter = (event) => {
    //console.log('new filter input:', event.target.value)
    setFilter(event.target.value)
  }

  if (!countries || countries.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Data for countries</h2>
      <Filter
        filter={filter}
        handleNewFilter={handleNewFilter}
      />
      <Countries
        countries={countries} filter={filter}
      />
    </div>
  )
}

export default App
