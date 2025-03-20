import { useState, useEffect } from "react"
import axios from 'axios'
import WeatherIcon from "./WeatherIcon"

const Weather = ({ capital, capitalInfo }) => {
  //console.log('Weather - capital:', capital)
  //console.log('Weather - capitalInfo:', capitalInfo)

  if (!capital) {
    return <p>Capital not specified, unable to get weather.</p>
  } else if (!capitalInfo || !capitalInfo.latlng || capitalInfo.latlng.length < 2) {
    return <p>Couldn't get info for capital {capital}, unable to get weather.</p>
  }

  const [weatherCode, setWeatherCode] = useState('')
  const [time, setTime] = useState('')
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [isDay, setIsDay] = useState(1) // Default to day

  useEffect(() => {
    //console.log('effect')
    if (!capitalInfo || !capitalInfo.latlng) {
      return
    }

    const api = `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${capitalInfo.latlng[0]}` +
                `&longitude=${capitalInfo.latlng[1]}` +
                `&current=temperature_2m,weather_code,is_day,` +
                `wind_speed_10m&wind_speed_unit=ms`
    //console.log('api:', api)

    axios
      .get(api)
      .then((response) => {
        //console.log('promise fulfilled')
        const response_data = response.data.current
        //console.log(response_data)

        setWeatherCode(response_data.weather_code)
        setTime(new Date(response_data.time).toLocaleString())
        setTemperature(response_data.temperature_2m)
        setWind(response_data.wind_speed_10m)
        setIsDay(response_data.is_day)
      })
      .catch(error => {
        console.log(error)
      })
  }, [capitalInfo.latlng])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <WeatherIcon
        weatherCode={weatherCode}
        isDay={isDay}
      />
      <p><b>Temperature:</b> {temperature} Celsius</p>
      <p><b>Wind:</b> {wind} m/s</p>
      <p style={{fontStyle: 'italic'}}>
        Time when updated: {time}
      </p>
    </div>
  )
}

export default Weather
