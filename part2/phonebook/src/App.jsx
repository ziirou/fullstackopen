import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
      number: newNumber,
    }
    console.log('adding person:', personObject)
    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name} from phonebook?`)) {
      console.log(`deleting person ${person.name}`)
    } else {
      console.log(`you canceled deleting ${person.name}`)
      return
    }

    personService
      .remove(id)
      .then(returnedPerson => {
        console.log(returnedPerson)
        persons.map(person => person.id !== id ? person : returnedPerson)
      })
      .catch(error => {
        console.log(error)
        alert(`Error deleting ${person.name} from phonebook.`)
      })
      setPersons(persons.filter(person => person.id !== id))
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
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
