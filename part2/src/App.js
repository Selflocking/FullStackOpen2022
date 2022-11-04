import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryWeather = ({ capital }) => {
    const [weather, setWeather] = useState()
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
            .then((response) => {
                setWeather(response.data)
            })
    }, [capital])
    // console.log(weather);
    if (weather !== undefined) {
        return (
            <>
                <div>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</div>
                <img alt="weather" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                <div>wind: {weather.wind.speed} m/s</div>
            </>
        )
    } else {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

}

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h5>languages:</h5>
            <ul>
                {Object.values(country.languages).map((language) => {
                    return <li key={language}>{language}</li>
                })}
            </ul>
            <img alt="flag" src={country.flags.svg} width="150" />
            <h4>Weather in {country.capital[0]}</h4>
            <CountryWeather capital={country.capital[0]} />
        </div>
    )
}

const ShowCountries = ({ countries }) => {
    const [show, setShow] = useState()
    // console.log(show); undefined
    const handleShow = (props) => {
        setShow(props)
    }
    if (show !== undefined) {
        return (
            <CountryInfo country={show} />
        )
    }
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
                    return (
                        <div key={country.ccn3}>
                            {country.name.common} <button onClick={() => { handleShow(country) }}>show</button>
                        </div>
                    )
                })}
            </div>
        )
    }
    if (countries.length === 1) {
        // Object.values(): object to array
        return (
            <CountryInfo country={countries[0]} />
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