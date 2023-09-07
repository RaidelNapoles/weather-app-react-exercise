import { useState } from "react";

export const App = () => {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "728748141fbd83ef04d573379c37c1c2";
  const diffKelvin = 273.15;

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const onInputChange = (e) => {
    setCity(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    if (city.length > 0) fetchWeather();
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${baseUrl}?q=${city}&appid=${API_KEY}&lang=es`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Ocurrió el siguiente problema: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>

      <form onSubmit={submit}>
        <input
          type="text"
          value={city}
          onChange={onInputChange}
          name="searchBar"
        />
        <button type="submit">Buscar</button>
      </form>

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {parseInt(weatherData?.main?.temp - diffKelvin)}°C</p>
          <p>Condición: {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};
