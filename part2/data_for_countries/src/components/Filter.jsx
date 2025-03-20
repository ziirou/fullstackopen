const Filter = ( {filter, handleNewFilter} ) => {
  //console.log('Filter - filter:', filter)
  return (
    <div>
      find countries
      <input
        value={filter}
        onChange={handleNewFilter}
      />
    </div>
  )
}

export default Filter
