const WeatherIcon = ({ weatherCode, isDay }) => {
  //console.log('WeatherIcon - weatherCode:', weatherCode)
  //console.log('WeatherIcon - isDay:', isDay)

  if (weatherCode.length < 1 || isDay.length < 1) {
    return <p>Unable to get weather icon.</p>
  }

  const suffix = isDay ? "d" : "n" // Determine day ("d") or night ("n")

  const iconMapping = {
    0: { icon: `01${suffix}`, description: "Clear sky" },
    1: { icon: `02${suffix}`, description: "Mainly clear" },
    2: { icon: `03${suffix}`, description: "Partly cloudy" },
    3: { icon: `04${suffix}`, description: "Overcast" },
    45: { icon: `50${suffix}`, description: "Fog" },
    48: { icon: `50${suffix}`, description: "Depositing rime fog" },
    51: { icon: `09${suffix}`, description: "Drizzle: Light intensity" },
    53: { icon: `09${suffix}`, description: "Drizzle: Moderate intensity" },
    55: { icon: `09${suffix}`, description: "Drizzle: Dense intensity" },
    56: { icon: `13${suffix}`, description: "Freezing Drizzle: Light intensity" },
    57: { icon: `13${suffix}`, description: "Freezing Drizzle: Dense intensity" },
    61: { icon: `10${suffix}`, description: "Rain: Slight intensity" },
    63: { icon: `10${suffix}`, description: "Rain: Moderate intensity" },
    65: { icon: `10${suffix}`, description: "Rain: Heavy intensity" },
    66: { icon: `13${suffix}`, description: "Freezing Rain: Light intensity" },
    67: { icon: `13${suffix}`, description: "Freezing Rain: Heavy intensity" },
    71: { icon: `13${suffix}`, description: "Snow fall: Slight intensity" },
    73: { icon: `13${suffix}`, description: "Snow fall: Moderate intensity" },
    75: { icon: `13${suffix}`, description: "Snow fall: Heavy intensity" },
    77: { icon: `13${suffix}`, description: "Snow grains" },
    80: { icon: `09${suffix}`, description: "Rain showers: Slight" },
    81: { icon: `09${suffix}`, description: "Rain showers: Moderate" },
    82: { icon: `09${suffix}`, description: "Rain showers: Violent" },
    85: { icon: `13${suffix}`, description: "Snow showers slight" },
    86: { icon: `13${suffix}`, description: "Snow showers heavy" },
    95: { icon: `11${suffix}`, description: "Thunderstorm: Slight or moderate" },
    96: { icon: `11${suffix}`, description: "Thunderstorm with slight hail" },
    99: { icon: `11${suffix}`, description: "Thunderstorm with heavy hail" },
  }

  // Default to "Clear sky" if not found
  const iconData = iconMapping[weatherCode] || { icon: `01${suffix}`, description: "Clear sky" };
  //console.log('WeatherIcon - iconData:', iconData)

  return (
    <img
        src={`https://openweathermap.org/img/wn/` +
              `${iconData.icon}` +
              `@2x.png`}
        alt={`Weather icon of ${iconData.description}`}
    />
  )
}

export default WeatherIcon
