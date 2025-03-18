import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const handleNewFilter = (event) => {
    //console.log('new filter input:', event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleNewFilter={handleNewFilter}
      />
      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
