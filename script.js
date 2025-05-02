async function getDashboardData(query) {
   
    const destinationUrl = `https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`;
    const weatherUrl = `https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`;
    const airportUrl = `https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`;
    
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

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+ 
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));
