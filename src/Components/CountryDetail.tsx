import { useState, FC } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import './contrydetail.css'

interface Props {
    officialName : string | null,
    capital: string | null,
    population: number | null,
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
    const { officialName, capital, population, flag } = state;

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
                <img src={flag} alt="officialName"/>
                <div className='capitalContainer' >
                    <h3>Capital</h3>
                    <h3>{capital}</h3>
                </div>
                <div className='capitalContainer'>
                    <h3>Population</h3>
                    <h4>{population}</h4>
                </div>
                <Button 
                    variant="contained" 
                    onClick={()=>getWeather()}
                    >Capital Weather
                </Button>
                {showWeather && 
                    <div>
                        <div className='logoContainer'>
                            <img src={weather.weatherIcon} alt="logo" />
                            <h4 style={{padding:"0 0.5rem"}}>{capital}</h4>
                        </div>
                        <div>
                            <span>Temperature :</span>
                            <span style={{margin: "0 0.5rem"}}>
                                {weather.temperature} celcius
                            </span>
                        </div>
                        <div>
                            <span>Wind Speed :</span>
                            <span style={{margin: "0 0.5rem"}}
                                >{weather.windSpeed} kmph
                            </span>
                        </div>
                        <div>
                            <span>Precip :</span>
                            <span style={{margin: "0 0.5rem"}}
                                >{weather.precip} mm
                            </span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Countrydetail;