import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    //console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        //console.log('promise fulfilled')
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log(error)

        setNotification({
          message: `Error ${error.status} on getting phonebook.`,
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }, [])
  //console.log('render', persons.length, 'persons')

  const replaceNumber = (id, personObject) => {
    const updatedPerson = { ...personObject, number: personObject.number }

    //console.log('updating person:', personObject)
    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        //console.log('updated person:', returnedPerson)
        setPersons(
          persons.map(person =>
            person.id !== id
            ? person
            : returnedPerson)
        )
        setNewName('')
        setNewNumber('')

        setNotification({
          message: `Updated number for ${returnedPerson.name}`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)

        setNotification({
          message: error.response.data.error,
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const matchPerson = persons.find(person => 
      person.name.toLowerCase() === personObject.name.toLowerCase())

    if (!personObject.name) {
      setNotification({
        message: `Person with EMPTY NAME can't be added to phonebook.`,
        type: 'warning'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    } else if (!personObject.number) {
      setNotification({
        message: `Person with EMPTY NUMBER can't be added to phonebook.`,
        type: 'warning'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    } else if (persons.find(person => person.number === personObject.number)) {
      setNotification({
        message: `${personObject.number} is already added to phonebook.`,
        type: 'warning'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    } else if (matchPerson) {
      const confirmNewName = confirm(`${personObject.name} is already added to phonebook, ` +
                                      `replace the old number with a new one?`)
      if (confirmNewName) {
        //console.log(`replacing number for ${matchPerson.name}`)
        replaceNumber(matchPerson.id, personObject)
        return
      } else {
        //console.log(`you canceled replacing number for ${matchPerson.name}`)
        return
      }
    }

    //console.log('adding new person:', personObject)
    personService
      .create(personObject)
      .then(createdPerson => {
        //console.log(createdPerson)
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')

        setNotification({
          message: `Added ${createdPerson.name}`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)

        setNotification({
          message: error.response.data.error,
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name} from phonebook?`)) {
      //console.log(`deleting person ${person.name}`)
    } else {
      //console.log(`you canceled deleting ${person.name}`)
      return
    }

    personService
      .remove(id)
      .then(returnedPerson => {
        //console.log(`returnedPerson: ${returnedPerson}`)
        persons.map(person =>
          person.id !== id
          ? person
          : returnedPerson)

        setNotification({
          message: `Deleted ${person.name}`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)

        setNotification({
          message: `Error ${error.status} on deleting ${person.name} from phonebook.`,
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
      <Notification notification={notification} />
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
