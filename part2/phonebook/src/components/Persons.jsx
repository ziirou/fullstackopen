import Person from './Person'

const Persons = ( {persons, deletePerson} ) => {
  //console.log('Persons - persons:', persons)

  if (!persons || persons.length === 0) {
    return <p>No persons in phonebook</p>
  }

  return (
    <ul>
      {persons.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={deletePerson}
        />
      )}
    </ul>
  )
}

export default Persons
