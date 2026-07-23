export async function getWeatherData() {
    const response = await fetch("https://api.weather.gov/points/36.9741,-122.0308");

    const initData = await response.json();
    const forecastURL = initData.properties.forecast;
    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();
    return forecastData;
}