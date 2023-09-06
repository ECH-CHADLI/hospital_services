import React, { useState, useRef } from 'react';
import { Products } from './prodjs';
import '../styles/stock.css';

import { UserAuth } from './context';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function StockUser() {

  const initCount = Array(Products.length).fill(0);
  let [count, setCount] = useState(initCount);

  const increment = (index) => {
    const newCount = [...count];
    newCount[index] += 1;
    setCount(newCount);
  }

  const decrement = (index) => {
    if(count[index] !== 0 ) {
      const newCount = [...count];
      newCount[index] -= 1;
      setCount(newCount);
    }
  }

  const quantity = useRef([])
  const title = useRef([])
  const {user} = UserAuth();

  const quantityCollection = collection(db, 'quantity_col')
  
  const sendRequest = async (index, e) => {
    e.preventDefault();
    const quantityContent = quantity.current[index].textContent;
    const titleContent = title.current[index].textContent;
    console.log('quantity: ' + quantityContent)
    console.log('title: ' + titleContent)
    try {
      await addDoc(quantityCollection, {
        id_field: index+1,
        title_field: titleContent,
        quantity_field: quantityContent,
        user_field: user.email
      })
      alert('Demande envoyer \u{1F44D}')
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='type-container'>
      {Products.map((products, index) => (
        <div className="type-user" key={products.id}>
          <img id='img-user' src={products.prodImg} alt="" />
          <div className="info-user">
            <h3 className="title-user" ref={el => {(title.current[index] = el)}}>{products.title}</h3>
            <div className="inc-dec">
                <button className="inc" onClick={() => increment(index)}>+</button> {/* not immediatly invoked */}
                <span className="quantity" ref={el => (quantity.current[index] = el)}>{count[index]}</span>
                <button className="dec" onClick={() => decrement(index)}>-</button>
            </div>
            <button className="demande-user" onClick={(e) => sendRequest(index, e)}>Demande</button>
          </div>
        </div>
      ))}
    </div>
  )
}
