import axios, { isAxiosError } from "axios";
import { FormData } from "../types";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY;

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export const getWeatherData = async (formData: FormData) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${formData.cityName},${formData.countryCode}`,
      {
        params: {
          appid: API_KEY,
          units: "metric", //Use metric for Celsius
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle 404 error specifically
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(
          "City not found. Please check the city name and country code."
        );
      } else {
        throw new Error("An error occurred.");
      }
    } else {
      throw new Error("An unknown error occurred.");
    }
    // Return null or handle error state in your application
    return null;
  }
};
