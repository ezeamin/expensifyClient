import React from 'react';

const Box = (props) => {
    let className = props.top ? "profile__resumen__box mt-3" : "profile__resumen__box ";
    className += props.className ? props.className : "";

    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default Box;