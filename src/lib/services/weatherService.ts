const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>()
const CACHE_DURATION = 30 * 60 * 1000

export interface WeatherData {
    description: string
    temperature: number
    icon: string
    isOutdoorFriendly: boolean
    humidity: number
    windSpeed: number
    feelsLike: number
}

export class WeatherError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'WeatherError'
    }
}

export async function getWeather(city: string): Promise<WeatherData> {
    if (!city) {
        throw new WeatherError('City name is required')
    }

    if (!API_KEY) {
        throw new WeatherError('Weather API key is not configured')
    }

    const cacheKey = `${city.toLowerCase()}`
    const cachedData = weatherCache.get(cacheKey)
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data
    }

    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        )

        if (!response.ok) {
            if (response.status === 401) {
                throw new WeatherError('Invalid API key')
            }
            if (response.status === 404) {
                throw new WeatherError(`City "${city}" not found`)
            }
            if (response.status === 429) {
                throw new WeatherError('API rate limit exceeded')
            }
            throw new WeatherError(`Weather API error: ${response.statusText}`)
        }

        const data = await response.json()

        const badWeather = ['Rain', 'Thunderstorm', 'Snow', 'Extreme', 'Drizzle', 'Storm']
        const isOutdoorFriendly = !badWeather.some(condition =>
            data.weather[0].main.includes(condition)
        ) && data.main.temp >= 10 && data.main.temp <= 35

        const weatherData: WeatherData = {
            description: data.weather[0].description,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            isOutdoorFriendly
        }

        weatherCache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        })

        return weatherData
    } catch (error) {
        if (error instanceof WeatherError) {
            throw error
        }
        console.error('Weather API Error:', error)
        throw new WeatherError('Failed to fetch weather data')
    }
} 