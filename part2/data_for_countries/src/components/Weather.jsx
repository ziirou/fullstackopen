import { useState, useEffect } from "react"
import axios from 'axios'

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

  const getWeatherIcon = (code, isDay) => {
    const suffix = isDay ? "d" : "n" // Determine day ("d") or night ("n")

    const iconMapping = {
        0: `01${suffix}`, // Clear sky
        1: `02${suffix}`, // Mainly clear
        2: `03${suffix}`, // Partly cloudy
        3: `04${suffix}`, // Overcast
        45: `50${suffix}`, // Fog
        48: `50${suffix}`, // Depositing rime fog
        51: `09${suffix}`, // Drizzle: Light intensity
        53: `09${suffix}`, // Drizzle: Moderate intensity
        55: `09${suffix}`, // Drizzle: Dense intensity
        56: `13${suffix}`, // Freezing Drizzle: Light intensity
        57: `13${suffix}`, // Freezing Drizzle: Dense intensity
        61: `10${suffix}`, // Rain: Slight intensity
        63: `10${suffix}`, // Rain: Moderate intensity
        65: `10${suffix}`, // Rain: Heavy intensity
        66: `13${suffix}`, // Freezing Rain: Light intensity
        67: `13${suffix}`, // Freezing Rain: Heavy intensity
        71: `13${suffix}`, // Snow fall: Slight intensity
        73: `13${suffix}`, // Snow fall: Moderate intensity
        75: `13${suffix}`, // Snow fall: Heavy intensity
        77: `13${suffix}`, // Snow grains
        80: `09${suffix}`, // Rain showers: Slight
        81: `09${suffix}`, // Rain showers: Moderate
        82: `09${suffix}`, // Rain showers: Violent
        85: `13${suffix}`, // Snow showers slight
        86: `13${suffix}`, // Snow showers heavy
        95: `11${suffix}`, // Thunderstorm: Slight or moderate
        96: `11${suffix}`, // Thunderstorm with slight hail
        99: `11${suffix}`, // Thunderstorm with heavy hail
    }

    return iconMapping[code] ?? `01${suffix}` // Default to clear sky
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <img
          src={`https://openweathermap.org/img/wn/` +
               `${getWeatherIcon(weatherCode, isDay)}` +
               `@2x.png`}
          alt="Weather Icon"
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
