import { useState, useEffect } from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = ( {countries, filter} ) => {
  if (!countries) {
    return
  }

  //console.log('Countries - countries:', countries)

  const [selectedCountry, setSelectedCountry] = useState(null)

  const countriesToShow = filter
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries

  // Reset selectedCountry when the filter changes
  useEffect(() => {
    setSelectedCountry(null)
  }, [filter])

  //console.log('Countries - countriesToShow.length:', countriesToShow.length)
  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countriesToShow.length === 1) {
    return <CountryInfo country={countriesToShow[0]} />
  }

  //console.log('Countries - countriesToShow:', countriesToShow)

  const handleShowInfo = (country) => {
    //console.log('handleShowInfo - country:', country)
    setSelectedCountry(country)
  }

  return (
    <div>
      {selectedCountry ? (
        <CountryInfo country={selectedCountry} />
      ) : (
        countriesToShow.map(country =>
          <Country
            key={country.ccn3}
            country={country}
            onShowInfo={() => handleShowInfo(country)}
          />
        )
      )}
    </div>
  )
}

export default Countries
