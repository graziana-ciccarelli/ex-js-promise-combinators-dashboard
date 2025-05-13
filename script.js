async function getDashboardData(query) {
    // URL aggiornati (senza /freetestapi)
    const destinationUrl = `http://localhost:3333/destinations?search=${query}`;
    const weatherUrl = `http://localhost:3333/weathers?search=${query}`;
    const airportUrl = `http://localhost:3333/airports?search=${query}`;
    
    try {
        const [destinationResponse, weatherResponse, airportResponse] = await Promise.all([
            fetch(destinationUrl).then(res => res.json()),
            fetch(weatherUrl).then(res => res.json()),
            fetch(airportUrl).then(res => res.json())
        ]);

        const cityData = destinationResponse[0];
        const weatherData = weatherResponse[0];
        const airportData = airportResponse[0];

        const dashboardData = {
            city: cityData.name,
            country: cityData.country,
            temperature: weatherData.temperature,
            weather: weatherData.weather_description,
            airport: airportData.name
        };

        return dashboardData;

    } catch (error) {
        console.error("Errore nella chiamata alle API:", error);
        throw error; 
    }
}

// Esegui la funzione con 'london' per test
getDashboardData('london')
    .then(data => {
        console.log('Dashboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));
