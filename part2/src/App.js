import { useEffect, useState } from 'react'
import phonebooks from './services/phonebooks'

const Filter = ({ value, onChange }) => {

    return (
        <div>
            filter shown with <input value={value} onChange={onChange} />
        </div>
    )
}

const PersonForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ personsToShow, handleDeletePerson }) => {
    return (
        <div>
            {personsToShow.map((person) => {
                return (
                    <div key={person.name}>
                        {person.name} {person.number}
                        <button onClick={() => { handleDeletePerson(person) }}>delete</button>
                    </div>
                )
            })}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        phonebooks
            .getAll()
            .then((data) => {
                setPersons(data)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newName === '') {
            alert('Please enter a name')
            return;
        }
        if (newNumber === '') {
            alert('Please enter the phone number')
            return;
        }
        let isNameRepeat = false;
        let isNumberRepeat = false;
        persons.forEach((person) => {
            if (person.name === newName) isNameRepeat = true
            if (person.number === newNumber) isNumberRepeat = true
        })
        if (isNameRepeat) {
            alert(`${newName} is already added to phonebook`)
        } else if (isNumberRepeat) {
            alert(`${newNumber} is already added to phonebook`)
        } else {
            const temp = { "name": newName, "number": newNumber }
            phonebooks
                .create(temp)
                .then((data) => {
                    // console.log(data)
                    setPersons(persons.concat(data))
                })
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleDeletePerson = (person) => {
        // console.log(person.id)
        if (window.confirm(`Delete ${person.name}`)) {
            // console.log("success")
            phonebooks
                .remove(person.id)
                .then((res) => {
                    // console.log(res)
                    setPersons(persons.filter(item => item.id !== person.id))
                })
        }
    }
    const personsToShow = search === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={search} onChange={handleSearchChange} />
            <h3>add a new</h3>
            <PersonForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson} />
        </div>
    )
}

export default App
