import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    const fetchData = async () => {
      try {
        const countryName = name.toLowerCase()
        const response = await axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        setCountry({ 
          found: true, 
          data: {
            name: response.data.name.common,
            capital: response.data.capital[0],
            population: response.data.population,
            flag: response.data.flags.png,
          }
        })
      } catch (exception) {
        console.log('error:', exception)
        setCountry({ found: false })
      }
    }

    fetchData()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const flagStyle = {
    height: '100px',
    border: '1px solid black',
    marginTop: '10px',
  }

  return (
    <div>
      <h3>{country.data.name}</h3>
      <div>capital: {country.data.capital}</div>
      <div>population: {country.data.population}</div>
      <img style={flagStyle} src={country.data.flag} alt={`flag of ${country.data.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
