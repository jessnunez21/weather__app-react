import React, { useState } from 'react'
import weatherApp from '../assets/weather_app.png'

const WeatherCart = ({weather, temp, setCountry, hasError, country}) => {
    const [isCelsius, setIsCelsius] = useState("true")

    const handleChangeTemp =()=>{
        setIsCelsius(!isCelsius)
    }
    const handleCountrySubmit =e=>{
        e.preventDefault();
        setCountry(e.target.country.value.trim())
        e.target.country.value = ''
    }
 
    
  return (
    <article className='cart__app'>
    <header className='header__appheader__app'>
        <img className='title__header' src={weatherApp} alt="weather app" />
        <h2 className='subtitle__header'>{weather?.name}, {weather?.sys.country}</h2>
    </header>

    <section className='formulario'>
        <form onSubmit={handleCountrySubmit} className='field' >
               <input type="text" id='country' className='input__form' name="Enter a country" autoComplete='off' required/>
                   <label  className='label-wrapper'>
                    <span className='label__text'>Enter a country </span>
                 </label> 
        </form>
    </section>

    <div className='country__error'>
    {hasError &&  <p>The country <span>{country}</span> was not found </p> }
    </div>

    <section className='section__app'>
        <div className='img_weather'>
            <img src={weather ? ` https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` : ''} alt="img weather" />
        </div>
        <div className='content__section'>
            <h3 className='section__description'>"{weather?.weather[0].description}"</h3>
            <ul className='list_description'> 
                <li className='li'><span className='items_list'>Wind Speed <b><i className='bx bx-wind'></i></b> </span><span className='items__content'>{weather?.wind.speed} m/s</span></li>
                <li className='li'><span className='items_list'>Clouds <b><i className='bx bxs-cloud'></i></b> </span><span className='items__content'>{weather?.clouds.all}%</span></li>
                <li className='li'><span className='items_list'>Pressure <b><i className='bx bxs-timer'></i></b> </span><span className='items__content'>{weather?.main.pressure} hPa</span></li>
            </ul>
        </div>
    </section>
   
    <aside className='aside'>
        <div className='aside__content'>
        <i className='bx bxs-thermometer'></i>
        <h2 className='subtitle__temp'>{  isCelsius ? `${temp?.celsius} ºC` : `${temp?.fahrenheit} ºF`}</h2>
        </div>
        <button  onClick={handleChangeTemp} className="bn-32 bn32">Change to {isCelsius ? 'ºF' : 'ºC'}</button>
    </aside>
   
</article>


  )
}

export default WeatherCart