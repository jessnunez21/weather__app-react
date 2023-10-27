import React from 'react'
import page from '../assets/page_not.svg'

const ErrorLoad = ({msjError}) => {
  return (
    <section className='app__error'>
        <div className='error__img'><img src={page} alt="dont_Page" /></div>
        <h3 className='error__title'> “No se puede acceder a este sitio web”</h3>
        <ul className='error__items'>
            <li>Verifica tu conexión a internet </li>
               <li>Intenta acceder al sitio web desde otro dispositivo o navegador</li> 
               <li>Borra la caché de tu navegador </li> 
               <li>{msjError}</li>         
        </ul>
    </section>
  )
}

export default ErrorLoad