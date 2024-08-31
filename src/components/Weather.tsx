import { WeatherData } from "../services/weatherService";

type WeatherProps = {
  weather: WeatherData | null,
  error: string
}

const Weather = ({ weather, error }: WeatherProps) => {

  return (
    <>
      {weather && (
        <div className="font-bold text-lg text-cyan-50">
          <p>City Name: {weather.name}</p >
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Temperature Max: {weather.main.temp_max}°C</p>
          <p>Temperature Min: {weather.main.temp_min}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          {weather.weather.map(data => (
            <p key={data.icon}>Description: {data.description}</p>
          ))
          }
        </div>
      )}
      {error && (
        <p className="text-center text-xl text-cyan-50 font-bold">{error}</p>
      )}
    </>
  )
}

export default Weather;