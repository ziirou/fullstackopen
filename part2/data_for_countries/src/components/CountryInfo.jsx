import Weather from './Weather'

const CountryInfo = ( {country} ) => {
  //console.log('CountryInfo - country:', country)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p><b>Region: </b>{country.region} ({country.subregion})</p>
      <p><b>Capital: </b>{country.capital} </p>
      <p><b>Area: </b>{country.area} km<sup>2</sup></p>
      <p><b>Population: </b>{country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages)
          .map(language => (
            <li key={language}>{language}</li>
          )
        )}
      </ul>
      <img className='flag'
        src={country.flags.png}
        alt={country.name.common}
      />
      <Weather
        capital={country.capital[0]}
        capitalInfo={country.capitalInfo}
      />
    </div>
  )
}

export default CountryInfo
