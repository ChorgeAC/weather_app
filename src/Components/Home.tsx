import { useState, FC } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './home.css';
import { useNavigate } from "react-router-dom";

const Home : FC = () =>{
    const [ country, setCountry ] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setCountry(e.target.value);
    }

    const fetchCountry = async () => {
        const url = `https://restcountries.com/v3.1/name/${country}`
        try {
            const response = await axios.get(url);
            setCountry("");
            console.log(response.data);
            navigate("/countrydetail" , 
                {state:{ 
                    officialName: response.data[0].name.official,
                    capital: response.data[0].capital[0] ,
                    population: response.data[0].population,
                    latitude: response.data[0].latlng[0],
                    langitude: response.data[0].latlng[1],
                    flag: response.data[0].flags.png ,
                }}
            );           
        } catch (error) {
            setCountry("");
            let message = 'Unknown Error'
            if (error instanceof Error){
                message = error.message;
            }                 
            alert(message);
        }
    }

    return(
        <Box className="container">
            <h1>Welcome to weather app</h1>
            <Box className="inputfiled">
                <TextField id="outlined-basic" label="country name" variant="outlined" value={country} onChange={handleChange}/>
            </Box>
            <Box className="btnContainer">
                <Button 
                    variant="contained" 
                    disabled={!country}
                    onClick={()=>fetchCountry()}
                    >
                        Submit
                </Button>
            </Box>
        </Box>
    )
}

export default Home;