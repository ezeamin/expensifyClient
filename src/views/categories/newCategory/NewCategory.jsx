import React from 'react';
import CategoryForm from '../../../components/categories/categoryForm/CategoryForm';
import Navegation from '../../../components/navegation/Navegation';

const NewCategory = (props) => {
    return (
        <div>
            <Navegation />
            <div className="expense__title mb-4">
                <h1>{props.name ? props.name : "Nueva categoria"}</h1>
            </div>
            <CategoryForm />
        </div>
    );
};

export default NewCategory;