export async function getWeatherData() {
    const response = await fetch(
        "https://api.weather.gov/points/36.9741,-122.0308"
    );

    if (!response.ok) {
        throw new Error(`NOAA API error: ${response.status}`);
    }

    const initData = await response.json();

    if (!initData.properties?.forecast) {
        throw new Error("NOAA response missing forecast URL");
    }
    
    const forecastURL = initData.properties.forecast;
    const forecastResponse = await fetch(forecastURL);

    if (!forecastResponse.ok) {
        throw new Error(`NOAA forecast API error: ${forecastResponse.status}`);
    }

    const forecastData = await forecastResponse.json();
    return forecastData;
}