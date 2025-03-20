import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = ( {countries, filter} ) => {
  if (!countries) {
    return
  }

  //console.log('Countries - countries:', countries)

  let countriesToShow = []
  countriesToShow = filter
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries

  //console.log('Countries - countriesToShow.length:', countriesToShow.length)
  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <CountryInfo country={countriesToShow[0]} />
    )
  }

  //console.log('Countries - countriesToShow:', countriesToShow)

  return (
    <div>
      {countriesToShow.map(country =>
        <Country
          key={country.ccn3}
          country={country}
        />
      )}
    </div>
  )
}

export default Countries
