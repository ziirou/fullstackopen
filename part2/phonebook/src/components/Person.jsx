const Person = ( {person} ) => {
  //console.log('Person - person:', person)
  return (
    <li>{person.name} {person.number}</li>
  )
}

export default Person
