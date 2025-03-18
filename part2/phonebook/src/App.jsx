import { useState } from 'react'

const Person = ( {person} ) => {
  //console.log('Person - person:', person)
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231234',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (!newName) {
      alert(`Person with EMPTY NAME can't be added to phonebook.`)
      return
    } else if (!newNumber) {
      alert(`Person with EMPTY NUMBER can't be added to phonebook.`)
      return
    } else if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
      return
    } else if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook.`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log('adding person:', personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    //console.log('new name input:', event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    //console.log('new number input:', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
