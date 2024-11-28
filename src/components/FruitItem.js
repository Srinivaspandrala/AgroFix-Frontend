import React from "react";
import './FruitItem.css'

const FruitItem = ({ fruit, onAddFruit, onRemoveFruit }) => {
    const handleAdd = () => {
        onAddFruit(fruit);
    };

    

    return (
        <div className="fruit-item">
            <img src={fruit.imgurl} alt={fruit.name} width="100" />
            <h3>{fruit.name}</h3>
            <p>₹{fruit.price}</p>
            <img onClick={handleAdd} width="64" height="64" src="https://img.icons8.com/nolan/64/shopping-cart.png" alt="shopping-cart"/>
        </div>
    );
};

export default FruitItem;
