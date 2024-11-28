import React, { useState } from "react";
import FruitItem from "./FruitItem";
import Cart from "./cart";
import OrderTracking from "./Tracking";
import './Fruitlist.css';


const fruits = [
    { id: 1, name: "Apple", imgurl: "https://img.icons8.com/?size=100&id=tsGqagtVj0Ka&format=png&color=000000", price: 153.45 },
    { id: 2, name: "Banana", imgurl: "https://img.icons8.com/?size=100&id=a1RyRkDIEI9B&format=png&color=000000", price: 72.13 },
    { id: 3, name: "Orange", imgurl: "https://img.icons8.com/?size=100&id=aw7Im1BRCOyY&format=png&color=000000", price: 98.27 },
    { id: 4, name: "Mango", imgurl: "https://img.icons8.com/?size=100&id=YqM7wGK6IUm5&format=png&color=000000", price: 200.34 },
    { id: 5, name: "Grapes", imgurl: "https://img.icons8.com/?size=100&id=WsAEBc9VDLm3&format=png&color=000000", price: 132.54 },
    { id: 6, name: "Pineapple", imgurl: "https://img.icons8.com/?size=100&id=KCmkmit6wLPS&format=png&color=000000", price: 110.22 },
    { id: 7, name: "Watermelon", imgurl: "https://img.icons8.com/?size=100&id=YSMnnHqUEJcI&format=png&color=000000", price: 45.67 },
    { id: 8, name: "Papaya", imgurl: "https://img.icons8.com/?size=100&id=gPS2FhVwnJuE&format=png&color=000000", price: 89.30 },
    { id: 9, name: "Strawberry", imgurl: "https://img.icons8.com/?size=100&id=brWmrA4--NST&format=png&color=000000", price: 250.15 },
    { id: 10, name: "Kiwi", imgurl: "https://img.icons8.com/?size=100&id=1GrV0yCPr1LJ&format=png&color=000000", price: 300.00 },
    { id: 11, name: "Peach", imgurl: "https://img.icons8.com/?size=100&id=0iLFQZy5IMwA&format=png&color=000000", price: 140.78 },
    { id: 12, name: "Pear", imgurl: "https://img.icons8.com/?size=100&id=uEAVGJdASskb&format=png&color=000000", price: 128.90 },
    { id: 13, name: "Cherry", imgurl: "https://img.icons8.com/?size=100&id=MIBVuUS4tMuw&format=png&color=000000", price: 275.60 },
    { id: 14, name: "Blueberry", imgurl: "https://img.icons8.com/?size=100&id=5MIdWtv25ZBe&format=png&color=000000", price: 299.99 },
    { id: 15, name: "Raspberry", imgurl: "https://img.icons8.com/?size=100&id=19529&format=png&color=000000", price: 280.44 },
    { id: 16, name: "Lemon", imgurl: "https://img.icons8.com/?size=100&id=aBCMLwJ2sW5b&format=png&color=000000", price: 68.80 },
    { id: 17, name: "Lime", imgurl: "https://img.icons8.com/?size=100&id=8TFvFB07FQAd&format=png&color=000000", price: 55.45 },
    { id: 18, name: "Guava", imgurl: "https://img.icons8.com/?size=100&id=pkO47CDn0C0Z&format=png&color=000000", price: 90.30 },
    { id: 19, name: "Pomegranate", imgurl: "https://img.icons8.com/?size=100&id=mWbf13SPDDNd&format=png&color=000000", price: 190.85 },
    { id: 20, name: "Dragonfruit", imgurl: "https://img.icons8.com/?size=100&id=SvjGogJDeppg&format=png&color=000000", price: 320.60 }

];

const Fruitlist = () => {
  const [addedfruit, setAddedFruit] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submissionId, settrackingId] = useState(null);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isApplicationVisible, setApplicationVisible] = useState(false);
  const [isOrderTrackingVisible, setOrderTrackingVisible] = useState(false);


  const handleAddFruit = (fruit) => {
    setAddedFruit((prevFruits) => {
      const updatedFruits = [...prevFruits];
      const existingFruitIndex = updatedFruits.findIndex((f) => f.id === fruit.id);

      if (existingFruitIndex !== -1) {
        updatedFruits[existingFruitIndex] = {
          ...updatedFruits[existingFruitIndex],
          quantity: updatedFruits[existingFruitIndex].quantity + 1,
          total: ((updatedFruits[existingFruitIndex].quantity + 1) * fruit.price).toFixed(2),
        };
      } else {
        updatedFruits.push({ ...fruit, quantity: 1, total: fruit.price.toFixed(2) });
      }

      return updatedFruits;
    });

    setTotalPrice((prevTotalPrice) => parseFloat((prevTotalPrice + fruit.price).toFixed(2)));
  };

  const handleRemoveFruit = (fruitId) => {
    setAddedFruit((prevFruits) => {
      const updatedFruits = prevFruits
        .map((fruit) => {
          if (fruit.id === fruitId) {
            if (fruit.quantity > 1) {
              return { ...fruit, quantity: fruit.quantity - 1, total: ((fruit.quantity - 1) * fruit.price).toFixed(2) };
            }
            return null; // Remove fruit completely if quantity is 1
          }
          return fruit;
        })
        .filter(Boolean); // Remove null values

      return updatedFruits;
    });

    const fruitToDecrement = addedfruit.find((fruit) => fruit.id === fruitId);
    if (fruitToDecrement) {
      setTotalPrice((prevTotalPrice) => parseFloat((prevTotalPrice - fruitToDecrement.price).toFixed(2)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalPrice > 0) {
      const randomId = Math.floor(2400000 + Math.random() * 90000000);
    settrackingId(randomId);

    try {
      const response = await fetch("http://localhost:5000/submitid", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingId: randomId, totalPrice }),
      });

      if (!response.ok) {
        throw new Error("Failed Payment");
      }

      const data = await response.json();
      alert(`Fruits Has Been Booked Successfully! ${randomId}`);
      console.log(data);

      setAddedFruit([]);
      setTotalPrice(0);
      settrackingId(null); // Clear submission ID
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit your application. Please try again.");
    }
      
    } else {
      alert("Cart is Empty")
      
    }
    
  };

  const Buynowhandle = () =>{
    setApplicationVisible(true)
  }

  const ClosebtnHandle =() =>{
    setCartVisible(false)
  }

  return (
    <div>
      <button onClick={() => setCartVisible(true)} className="viewbutton">Cart</button>
      <button onClick={() => setOrderTrackingVisible(true)} className="tracking-section">Tracking</button>
      <h1>Fruit List</h1>
      {fruits.map((fruit) => (
        <FruitItem key={fruit.id} fruit={fruit} onAddFruit={handleAddFruit} onRemoveFruit={handleRemoveFruit} />
      ))}

      {isCartVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <Cart addedFruit={addedfruit} totalPrice={totalPrice} handleRemoveFruit={handleRemoveFruit} />
            <button className="buy-now-cart" onClick={Buynowhandle}>Buy Now</button>
            <button className="close-button-cart" onClick={ClosebtnHandle}>Close</button>
          </div>
        </div>
      )}
      {isOrderTrackingVisible && (
        <div className="overlay order-tracking">
          <div className="overlay-content">
            <OrderTracking />
            <button className="close-button" onClick={() => setOrderTrackingVisible(false)}>Close</button>
          </div>
        </div>
      )}


      {isApplicationVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h1>PAYMENT</h1>
            <p className="order-id">Order ID{submissionId}</p>
            <p className="total-price">Total Price: ₹{totalPrice.toFixed(2)}</p>
            <button type="button" className="Proccednext" onClick={handleSubmit}>Procced Next</button>
            <button className="back-button" onClick={() => setApplicationVisible(false)}>Back</button>
          </div>
        </div>
      )}


  </div>
  );
};

export default Fruitlist;