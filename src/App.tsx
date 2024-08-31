import { useState } from "react";
import Form from "./components/Form";
import Weather from "./components/Weather";
import { WeatherData } from "./services/weatherService";

const App = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  return (
    <div className="max-w-[340px] m-auto min-h-screen px-4 grid grid-rows-[auto_1fr_auto] sm:m-auto">
      <header className="p-4">
        <h1 className="text-center font-bold text-2xl">Weather APP</h1>
      </header>
      <main className="flex flex-col gap-4 sm:my-auto">
        <Form
          setWeather={setWeather}
          setError={setError}
        />
        <Weather
          weather={weather}
          error={error}
        />
      </main>
      <footer className="text-center p-4">
        <p className="font-medium text-white">&copy; 2024 All rights reserved</p>
      </footer>
    </div>
  )
}

export default App;
