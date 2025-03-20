const Country = ( {country, onShowInfo} ) => {
  //console.log('Country - country:', country)

  return (
    <div>
      {country.name.common}
      <button
        onClick={() => onShowInfo(country)}>
        Show
      </button>
    </div>
  )
}

export default Country
