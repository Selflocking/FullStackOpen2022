import { useEffect, useState } from 'react'
import axios from 'axios'

const ShowCountries = ({ countries }) => {
    // console.log(countries.length);
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (countries.length > 1) {
        return (
            <div>
                {countries.map((country) => {
                    return <p key={country.ccn3}>{country.name.common}</p>
                })}
            </div>
        )
    }
    if (countries.length === 1) {
        const country = countries[0]
        // Object.values(): object to array
        return (
            <div>
                <h3>{country.name.common}</h3>
                <div>capital {country.capital[0]}</div>
                <div>area {country.area}</div>
                <h4>languages:</h4>
                <ul>
                    {Object.values(country.languages).map((language) => {
                        return <li key={language}>{language}</li>
                    })}
                </ul>
                <img alt="flag" src={country.flags.svg} width="150" />
            </div>
        )
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [done, setDone] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountries(response.data)
                setDone(true)
            })
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const countriesToShow = done ? countries.filter((country) => {
        // console.log(country.name.common)    
        return country.name.common.toLowerCase().includes(search.toLowerCase())
    }) : []
    // const countriesToShow = done?[countries[1]]:[];
    // console.log(countriesToShow);

    return (
        <div>
            <div>
                find countries <input value={search} onChange={handleSearch} />
            </div>
            <ShowCountries countries={countriesToShow} />
        </div>
    )
}

export default App