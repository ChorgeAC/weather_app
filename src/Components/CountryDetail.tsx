import { useState, FC } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import './contrydetail.css'

interface Props {
    officialName : string,
    capital: string,
    population: number,
    latitude: number,
    langitude: number,
    flag?: string | undefined,
}

interface Fweather {
    temperature : number,
    weatherIcon? : string | undefined,
    windSpeed: number,
    precip: number,
}

const Countrydetail : FC = () =>{
    const [ weather, setWeather] = useState<Partial<Fweather>>({});
    const [ showWeather, setShowWeather] = useState(false);
    const location = useLocation();
    const state = location.state as Props;
    const { officialName, capital, population, langitude, latitude, flag } = state;

    const getWeather = async () =>{
        const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`
        
        try {
            const response = await axios.get(url);
            const { current } = response.data
            setWeather({
                temperature : current.temperature,
                weatherIcon : current.weather_icons[0],
                windSpeed : current.wind_speed,
                precip : current.precip
            })
            setShowWeather(!showWeather);
        } catch (error) {
            console.log("Error");
        }
    }

    return(
        <>
            <div className="container">
                <h1>{officialName}</h1>
                <img src={flag} alt={officialName}/>
                <div className='itemContainer' >
                    <h3>Capital</h3>
                    <h3>{capital}</h3>
                </div>
                <div className='itemContainer'>
                    <h3>Population</h3>
                    <h4>{population}</h4>
                </div>
                <div className='itemContainer'>
                    <h3>latitude</h3>
                    <h4>{latitude}{'\u00b0'} N</h4>
                </div>
                <div className='itemContainer'>
                    <h3>langitude</h3>
                    <h4>{langitude}{'\u00b0'} E</h4>
                </div>
                <Button 
                    variant="contained" 
                    onClick={()=>getWeather()}
                    >Capital Weather
                </Button>
                {showWeather && 
                    <div className='weatherInfo'>
                        <div className='weatherInfoItems'>
                            <img src={weather.weatherIcon} alt="logo" />
                            <p>{capital}</p>
                        </div>
                        <div className='weatherInfoItems'>
                            <div>Temperature</div>
                            <p>{weather.temperature}{'\u00b0'} C</p>
                        </div>
                        <div className='weatherInfoItems'>
                            <div>Wind Speed</div>
                            <p>{weather.windSpeed} Kmph</p>
                        </div>
                        <div className='weatherInfoItems'>
                            <div>Precip</div>
                            <p>{weather.precip} mm</p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Countrydetail;