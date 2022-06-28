import React from 'react';
import { useNavigate } from 'react-router-dom';
import './backButton.css';

const BackButton = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    const className = props.className ? props.className + ' backButton' : 'backButton';
    
    return (
        <button onClick={handleClick} className={className}>
            <i className="fa-solid fa-arrow-left"></i>
        </button>
    );
};

export default BackButton;