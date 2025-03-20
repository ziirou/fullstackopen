const WeatherIcon = ({ weatherCode, isDay }) => {
  //console.log('WeatherIcon - weatherCode:', weatherCode)
  //console.log('WeatherIcon - isDay:', isDay)

  if (weatherCode.length < 1 || isDay.length < 1) {
    return <p>Unable to get weather icon.</p>
  }

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

    const iconCode = iconMapping[code] ?? `01${suffix}` // Default to clear sky
    //console.log('WeatherIcon - iconCode:', iconCode)
    return iconCode
  }

  return (
    <img
        src={`https://openweathermap.org/img/wn/` +
              `${getWeatherIcon(weatherCode, isDay)}` +
              `@2x.png`}
        alt="Weather Icon"
    />
  )
}

export default WeatherIcon
