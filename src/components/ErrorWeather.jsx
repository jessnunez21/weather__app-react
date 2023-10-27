import React from 'react'
import imgErr from '../assets/error-wifi.jpg'


const ErrorWeather = ({msjError}) => {

  return (
    <section className='app__error'>
        <div className='img__error'>
            <img src={imgErr} alt="" />
        </div>
        <h2>No hay coneccion a internet</h2>
        <p>Prueba a</p>
        <ul>
            <li>Comprueba el cable de red, el moden y el router</li>
            <li>Vuelve a conectarte a una red Wi-fi</li>
             {
                msjError ? <li>{msjError}</li> : ''
             }
        </ul>
    </section>
  )
}

export default ErrorWeather