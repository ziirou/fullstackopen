const Person = ( {person, deletePerson} ) => {
  //console.log('Person - person:', person)
  return (
    <li>
      {person.name} {person.number}
      <button
        style={{ marginLeft: '5px' }}
        onClick={() => deletePerson(person.id)}>
        delete
      </button>
    </li>
  )
}

export default Person
