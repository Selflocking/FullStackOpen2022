import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
            if ((person.name) === newName) isNameRepeat = true
            if (person.number === newNumber) isNumberRepeat = true
        })
        if (isNameRepeat) {
            alert(`${newName} is already added to phonebook`)
        } else if (isNumberRepeat) {
            alert(`${newNumber} is already added to phonebook`)
        } else {
            setPersons(persons.concat({ "name": newName, number: newNumber }))
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

    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>
            <div>
                {persons.map((person) =>
                    <p key={person.name}>{person.name} {person.number}</p>
                )}
            </div>
        </div>
    )
}

export default App
