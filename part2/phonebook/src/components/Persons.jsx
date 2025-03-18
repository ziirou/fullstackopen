import Person from './Person'

const Persons = ( {persons} ) => {
  //console.log('Persons - persons:', persons)
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

export default Persons
