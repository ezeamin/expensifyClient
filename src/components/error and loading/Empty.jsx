import { Button } from '@mui/material';
import React from 'react';
import './style.css'

const Empty = (props) => {
    return (
        <div className='empty'>
            <p className='mb-0 display text-light'>No hay {props.name} :P</p>
            {props.name === 'categorias' ? <Button className="mt-2" variant='outlined' color={"successColor"} onClick={()=>props.cargarPack()}>Cargar pack recomendado</Button> : null}
        </div>
    );
};

export default Empty;