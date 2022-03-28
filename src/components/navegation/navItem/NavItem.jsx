import React from 'react';
import './navItem.css';

const NavItem = (props) => {
    if(props.active) return (
        <a href={props.enlace} className='navegation__box__navItem navegation__box__navItem--activo'>
            <div className='navegation__box__navItem__logo'>
                <i className={props.icono}></i>
            </div>
        </a>
    );
    return (
        <a href={props.enlace} className='navegation__box__navItem'>
            <div className='navegation__box__navItem__logo'>
                <i className={props.icono}></i>
            </div>
        </a>
    );
};

export default NavItem;

//estoy empezando por el diseño de la app, y ya tengo ideas para que sea mas bonita, empezando por el modo oscuro para no matarte los ojos a la noche