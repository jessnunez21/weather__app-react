  
import { useEffect, useState } from 'react'
import getApiKey from '../src/utilis/getApiKey.js'
import axios from 'axios'
import './App.css'
import WeatherCart from './components/WeatherCart.jsx'
import Loading from './components/Loading.jsx'
import ErrorLoad from './components/ErrorLoad.jsx'
import '../src/stylesWeather/weatherCart.css'
import '../src/stylesWeather/loandingCss.css'
import '../src/stylesWeather/appError.css'

import img2 from '../src/assets/background/img2.png'
import CoordsError from './components/CoordsError.jsx'



function App() {
  const [coords, setCoords] = useState() /*estado de coordenadas*/
  const [weather, setWeather] = useState() /* estado de api*/
  const [temp, setTemp] = useState() /*temperatura celsius*/
  const [isLoading, setIsLoading] = useState(true) /*loading*/
  const [isError, setIsError] = useState(false) /*error de api*/
  const [msjError, setMsjError] = useState() /*msj de error de api*/
  const [country, setCountry] = useState()/*paises en input*/
  const [hasError, setHasError] = useState(false)

  

  useEffect(()=>{
   
    const success = pos=>{
   
      const obj = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }
      setCoords(obj)
      setHasError(false)
     
    }

    const error =()=>{
      setHasError(true)
    }
    navigator.geolocation.getCurrentPosition(success, error)
    
  },[])

  useEffect(()=>{
    if (country) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${getApiKey()}`
      setIsLoading(true)
      axios.get(url)
      .then(res=>{setWeather(res.data)
          setHasError(false)
      })

      .catch(err => {console.log(err)
        setHasError(true)
        setTimeout(() => {
          setHasError(false)
        }, 3000);
      })
       .finally(()=>setIsLoading(false))
    }
    },[country ])
  
  useEffect(()=>{
  if (coords) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${getApiKey()}`
    setIsLoading(true)
    axios.get(url)
    .then(res => {setWeather(res.data)
    
        const objTemp ={
          celsius: +(res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: +((res.data.main.temp - 273.15) * 9/5 + 32 ).toFixed(1)
        }
        setTemp(objTemp)
        setIsError(false)
    })
    .catch(err => {console.log(err)
                    setMsjError(err.message)
                    setIsError(true)
    })
    .finally(()=>setIsLoading(false))
     
    
  }
 
  },[coords])

 





  const styleImg ={
    
    backgroundImage:`url(${img2})`,
  }

  
  
  return (
    <div style={styleImg} className='app'>
      <span className='transparencia'>
      
      
      {
        coords ? 
           isLoading
             ? <Loading />
             : isError
                ?  <ErrorLoad msjError={msjError}/>
                :  <WeatherCart  weather={weather} temp={temp} setCountry={setCountry} hasError={hasError} country={country}/>    
                     : <CoordsError/>
              }
      </span>
    </div>
   
  )
}

export default App
