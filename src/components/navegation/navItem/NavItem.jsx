import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navItem.css';

const NavItem = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.enlace);
    }

    if(props.active) return (
        <button onClick={handleClick} className='navegation__box__navItem navegation__box__navItem--activo'>
            <div className='navegation__box__navItem__logo'>
                <i className={props.icono}></i>
            </div>
        </button>
    );
    return (
        <button onClick={handleClick} className='navegation__box__navItem'>
            <div className='navegation__box__navItem__logo'>
                <i className={props.icono}></i>
            </div>
        </button>
    );
};

export default NavItem;