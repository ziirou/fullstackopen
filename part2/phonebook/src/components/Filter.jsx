const Filter = ( {filter, handleNewFilter} ) => {
  //console.log('Filter - filter:', filter)
  return (
    <div>
      filter shown names with:
      <input
        value={filter}
        onChange={handleNewFilter}
      />
    </div>
  )
}

export default Filter
