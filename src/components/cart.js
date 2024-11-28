// Cart.js
import React from "react";
import './cart.css';

const Cart = ({ addedFruit, totalPrice, handleRemoveFruit }) => {
    return (
        <div className="cart-container">
            <h1>Cart</h1>
            <div className="cart-items">
                <ul>
                    {addedFruit.length === 0 ? (
                        <li>No items in the cart</li>
                    ) : (
                        addedFruit.map((fruit) => (
                            <li key={fruit.id} className="cart-item">
                                <img src={fruit.imgurl} alt={fruit.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                <span>{fruit.name} - ₹{fruit.total} x  {fruit.quantity}</span>
                                    <span>Quantity: </span>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveFruit(fruit.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="total-price">
                <p>Total: ₹{totalPrice}</p>
            </div>
        </div>
    );
};

export default Cart;
