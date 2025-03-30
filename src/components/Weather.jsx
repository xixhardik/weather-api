  import React, { useEffect, useState, useRef } from 'react';
  import './Weather.css'
  import search_icon from '../assets/search.png'
  import clear_icon from '../assets/clear.png'
  import clearn_icon from '../assets/clearn.png'
  import cloud_icon from '../assets/cloud.png'
  import cloudn_icon from '../assets/cloudn.png'
  import drizzle_icon from '../assets/drizzle.png'
  import drizzlen_icon from '../assets/drizzlen.png'
  import humidity_icon from '../assets/humidity.png'
  import country_icon from '../assets/country.webp'
  import rain_icon from '../assets/rain.png'
  import rainn_icon from '../assets/rainn.png'
  import snow_icon from '../assets/snow.png'
  import snown_icon from '../assets/snown.png'
  import wind_icon from '../assets/wind.png'
  const Weather = () => {
    const inputRef = useRef()

    const[weatherData, setWeatherData] = useState(false);
    const allIcons ={
      "01d" :clear_icon,
      "01n" :clearn_icon,
      "02d" : cloud_icon,
      "02n" : cloudn_icon,
      "03d" : cloud_icon,
      "03n" : cloudn_icon,
      "04d" : drizzle_icon,
      "04n" : drizzlen_icon,
      "09d" : rain_icon,
      "09n" : rainn_icon,
      "10d" : rain_icon,
      "10n" : rainn_icon,
      "13d" : snow_icon,
      "13n" : snown_icon,
    }
    const search = async(city)=>{
      if(city === ""){
        alert ("Sepling Wrogn");
        return
      }
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const responce = await fetch(url);
        const data = await responce.json();
  if(!responce.ok){
    alert(data.message);
    return;
  }

        console.log(data); 
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity : data.main.humidity,
          windSpeed : data.wind.speed,
          temperature : Math.floor(data.main.temp),
          location : data.name,
          icon : icon,
          country : data.sys.country
        })
        
      } catch (error) {
        setWeatherData(false);
        console.error("Fetch error:", error);
      }
      
    }

    useEffect(()=>{
      search("Chandigarh");
    },[])



    return (
      <div className='weather'>
        <div className="search-bar">
          <input  ref = {inputRef}type="text" placeholder='search'/>
          <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
          
          

        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" onClick={()=>search(inputRef.current.value)} />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} Km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
          <div className="col">
            <img src={country_icon} alt="" onClick={()=>search(inputRef.current.value)} />
            <div>
              <p>{weatherData.country}</p>
              <span>Country</span>
            </div>
          </div>
        </div>
        </>:<></>}
      </div>
    )
  }

  export default Weather
