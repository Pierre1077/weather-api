import React, { useEffect, useState } from 'react';
import 'axios'
import axios from "axios";
import Card from "../../components/Card/Card";
import './Home.css'

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState(
        [
            'Aix-en-Provence',
            'Amiens',
            'Angers',
            'Antibes',
            'Argenteuil',
            'Asnières-sur-Seine',
            'Aubervilliers',
            'Aulnay-sous-Bois',
            'Avignon',
            'Besançon',
            'Bordeaux',
            'Boulogne-Billancourt',
            'Brest',
            'Caen',
            'Cannes',
            'Cergy',
            'Chambéry',
            'Champigny-sur-Marne',
            'Cholet',
            'Clermont-Ferrand',
            'Colmar',
            'Colombes',
            'Courbevoie',
            'Créteil',
            'Dijon',
            'Drancy',
            'Dunkerque',
            'Grenoble',
            'Issy-les-Moulineaux',
            'Le Havre',
            'Le Mans',
            'Levallois-Perret',
            'Lille',
            'Limoges',
            'Lyon',
            'Marseille',
            'Metz',
            'Montpellier',
            'Montreuil',
            'Mulhouse',
            'Nancy',
            'Nantes',
            'Nice',
            'Nîmes',
            'Orléans',
            'Paris',
            'Perpignan',
            'Poitiers',
            'Reims',
            'Rennes',
            'Roubaix',
            'Rouen',
            'Saint-Denis',
            'Saint-Étienne',
            'Saint-Maur-des-Fossés',
            'Saint-Nazaire',
            'Saint-Quentin',
            'Strasbourg',
            'Toulon',
            'Toulouse',
            'Tourcoing',
            'Tours',
            'Troyes',
            'Valence',
            'Villeurbanne'
        ]
    );
    const [isPinned, setIsPinned] = useState([]);
    const apiKey = '14604365580ec74eb2fcc0eec4e2b580';

    const fetchWeatherData = () => {
        try {

            const requests = city.map(cityName => {
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
                return axios.get(apiUrl);
            });

            axios.all(requests)
                .then(axios.spread((...responses) => {
                    const weatherData = responses.map(response => response.data);
                    setWeatherData(weatherData);
                }))
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        // const fetchWeatherData = async () => {
        //     try {
        //         const apiKey = '14604365580ec74eb2fcc0eec4e2b580';
        //
        //         const promises = city.map(async city => {
        //             const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        //             const response = await fetch(apiUrl);
        //             return await response.json();
        //         });
        //
        //         const weatherData = await Promise.all(promises);
        //         setWeatherData(weatherData);
        //     } catch (error) {
        //         console.error('Error fetching weather data:', error);
        //     }
        // };
        //
        // fetchWeatherData();


        fetchWeatherData();


        const saveWeather = localStorage.getItem('weather');
        if (saveWeather) {
            setWeatherData(Object.values(JSON.parse(saveWeather)));
        }

        const saveWeatherPinned = localStorage.getItem('weatherPinned');
        if (saveWeatherPinned) {
            setIsPinned(Object.values(JSON.parse(saveWeatherPinned)));
        }



    }, []);
    function sunriseTimestamp(sunriseTimestamp) {
        const sunriseDate = new Date(sunriseTimestamp * 1000);

        const sunriseHours = sunriseDate.getHours();
        const fixeHours = ("0" + sunriseHours).slice(-2);

        const sunriseMinutes = sunriseDate.getMinutes();
        const fixeMinutes = ("0" + sunriseMinutes).slice(-2);

        return `${fixeHours}:${fixeMinutes}`;
    }

    function sunsetTimestamp(sunsetTimestamp) {

        const sunsetDate = new Date(sunsetTimestamp * 1000);

        const sunsetHours = sunsetDate.getHours();
        const fixeHours = ("0" + sunsetHours).slice(-2);

        const sunsetMinutes = sunsetDate.getMinutes();
        const fixeMinutes = ("0" + sunsetMinutes).slice(-2);

        return `${fixeHours}:${fixeMinutes}`;
    }


    function togglePin(data) {
       const checkPinned = isPinned.find((i) => i.id === data.id)
        if (checkPinned) {
            const removePinned = isPinned.filter((i) => i.id !== data.id)
            setIsPinned([...removePinned])
            localStorage.setItem('weatherPinned', JSON.stringify(removePinned));
        } else {
            setIsPinned([...isPinned, data])
            localStorage.setItem('weatherPinned', JSON.stringify([...isPinned, data]));
        }
    }

    function searchCity(search) {
        const capitalize = search.target.value.charAt(0).toUpperCase()+search.target.value.slice(1)
        if (search.target.value !== '') {
            const foundCity = city.find((c) =>  c.includes(capitalize));
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${foundCity}&appid=14604365580ec74eb2fcc0eec4e2b580`).then((c) => {
                setWeatherData([c.data])
            });
        }else {
            fetchWeatherData();
        }
    }

    return (
        <div>
            <h1 className={'title'}>Weather API</h1>
            <div>
                <input type={'text'} onChange={searchCity} placeholder={'Search a specific city'} />
            </div>
            <h2 className={'subtitle'}>Pinned cities</h2>
            <div className={'city__container'}>
                {isPinned.length > 0 ?
                    isPinned.map((pinned, index) => {
                            return (

                                <Card
                                    key={index}
                                    name={pinned.name}
                                    temperature={((pinned.main.temp) -  273.15).toFixed(0) + ' °C'}
                                    clouds={pinned.clouds.all}
                                    description={pinned.weather[0].main}
                                    wind={((pinned.wind.speed) * 3.6).toFixed(0) + ' km/h'}
                                    sunrise={sunriseTimestamp(pinned.sys.sunrise)}
                                    sunset={sunsetTimestamp(pinned.sys.sunset)}
                                    togglePin={() => togglePin(pinned)}
                                    pin={isPinned.find((i) => i.id === pinned.id) ? '#de1313' : '#a3a3a3'}
                                />


                            );
                        })
                    : <p className={'emptyIsPinned'}>No pinned cities yet </p>}

            </div>
            <h2 className={'subtitle'}>All Cities</h2>
            <div className={'city__container'}>
                {weatherData.length > 0 ? (
                    weatherData.map((data, index) => (

                        <Card
                            key={index}
                            name={data.name}
                            temperature={((data.main.temp) -  273.15).toFixed(0) + ' °C'}
                            clouds={data.clouds.all}
                            description={data.weather[0].main}
                            wind={((data.wind.speed) * 3.6).toFixed(0) + ' km/h'}
                            sunrise={sunriseTimestamp(data.sys.sunrise)}
                            sunset={sunsetTimestamp(data.sys.sunset)}
                            togglePin={() => togglePin(data)}
                            pin={isPinned.find((i) => i.id === data.id) ? '#de1313' : '#a3a3a3'}
                        />

                    ))
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
