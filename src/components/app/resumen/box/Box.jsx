import React from 'react';

const Box = (props) => {
    const className = props.top ? "profile__resumen__box mt-3" : "profile__resumen__box ";
    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default Box;