import React from 'react';
import CategoryForm from '../../../components/categories/categoryForm/CategoryForm';
import Navegation from '../../../components/navegation/Navegation';

const icons = [
    "fa-solid fa-utensils",
    "fa-solid fa-candy-cane",
    "fa-solid fa-ice-cream",
    "fa-solid fa-tshirt",
    "fa-solid fa-car",
    "fa-solid fa-bus",
    "fa-solid fa-bicycle",
    "fa-solid fa-plane",
    "fa-solid fa-briefcase",
    "fa-solid fa-file-invoice-dollar",
    "fa-solid fa-building-columns",
    "fa-solid fa-dumbbell",
    "fa-solid fa-home",
    "fa-solid fa-hotel",
    "fa-solid fa-shopping-cart",
    "fa-solid fa-shopping-basket",
    "fa-solid fa-champagne-glasses",
    "fa-solid fa-dice",
    "fa-solid fa-gift",
    "fa-solid fa-film",
    "fa-solid fa-music",
    "fa-solid fa-cannabis",
    "fa-solid fa-paw",
    "fa-solid fa-staff-aesculapius",
    "fa-solid fa-hand-holding-heart",
    "fa-solid fa-pills",
    "fa-solid fa-book",
    "fa-solid fa-cross",
    "fa-solid fa-globe",
    "fa-solid fa-user-group",
    "fa-solid fa-child",
    "fa-solid fa-baby",
    "fa-solid fa-circle-question",
  ];

const NewCategory = (props) => {
    return (
        <div>
            <Navegation />
            <div className="panel">
                <div className="expense__title mb-4">
                    <h1>{props.name ? props.name : "Nueva categoria"}</h1>
                </div>
                <CategoryForm isNew={false} type="category" defaultIcon={"fas fa-utensils"} icons={icons}/>
            </div>
        </div>
    );
};

export default NewCategory;