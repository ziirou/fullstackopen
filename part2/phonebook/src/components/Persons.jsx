const Persons = ( {persons} ) => {
  //console.log('Persons - persons:', persons)
  return (
    <ul>
      {persons.map(person =>
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      )}
    </ul>
  )
}

export default Persons
