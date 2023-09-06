import React, { useState, useEffect, useRef } from 'react';
import { Products } from './prodjs';
import '../styles/stock.css';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from './context';
import emailjs from 'emailjs-com';

export default function Stock() {

  const [inputs, setInputs] = useState([]); /* the state variable is not a regular array, it's a tuple */
  
  function handleUpdateClick(productId) {
    const inputValue = inputs[`inputs-${productId}`];
    localStorage.setItem(`product-${productId}`, inputValue);
    console.log(`Data for product ${productId} stored in local storage.`);
  }

  const [userDemand, setUserDemand] = useState([]);
  const quantityCollection = collection(db, 'quantity_col')
  const getDemand = async () => {
    try {
      const data = await getDocs(quantityCollection);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setUserDemand(filteredData);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDemand();
  }, []);

  const handleAccept = (email, src_email, quantite, titre, id, id_col, index) => {
    const emailPrams = {
      to_email: email,
      from_email: src_email,
      message: 'Votre demande de ' + quantite + ' ' + titre + ' a ete accepter, merci de passer par la secretaire pour la recuperer'
    };
    emailjs.send('service_3szw7om', 'template_e7o5x6l', emailPrams, 'Ywo_2LvbmShpQKDeO')
      .then((resp) => {
        console.log('email sent successfully ', resp)
      }).catch((err) => {
        console.log('email sending failed ', err )
      })

    let prodVal = localStorage.getItem(`product-${id}`) - quantite;
    console.log(localStorage.getItem(`product-${id}`))
    localStorage.setItem(`product-${id}`, prodVal);
    console.log(localStorage.getItem(`product-${id}`))

    clickers(index, 2);
    deleteDemand(id_col);
  }       
  const {user} = UserAuth();

  const deleteDemand = async (id) => {
    try {
      const demandDoc = doc(db, 'quantity_col', id);
      await deleteDoc(demandDoc);
    } catch(err) {
      console.log('the error is:' , err);
    }
  } 

  const demandRefs = useRef([]);
  function clickers (index, num) {
    const demandMessage = demandRefs.current[index];
    if(num === 1) {
      demandMessage.style.color = 'red';
      demandMessage.style.textDecoration = 'line-through';
    } else demandMessage.style.color = 'green';
  }
  const refuseDemand = async (id, index) => {
    deleteDemand(id);
    clickers(index, 1);
  }

  return (
    <div className='stocking'>

      <div className="tab">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((products) => (
                <tr>
                  <td>{products.title}</td>
                  <td>{localStorage.getItem(`product-${products.id}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <div className='type-container'>
        {Products.map((products) => (
          <div className="type">
            <h3 className="title">{products.title}</h3>
            <img id='img' src={products.prodImg} alt="" />
            <div className="info">

              <input type="text" className="quantity" placeholder="num" 
                value={inputs[`inputs-${products.id}`]}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputs((prevInputs) => (
                    {...prevInputs, [`inputs-${products.id}`]: value,}
                  ));
                }}
              />

              <button className="update" 
                onClick={() => {
                  handleUpdateClick(products.id);
                }}>Update</button>
            </div>
          </div>
        ))}
      </div>

      <div className="demand">
          <h1>Voir les demandes</h1>
          {userDemand.map((demand, index) => (
            <div className='each-demand'>
              <h5 className='demand-message' ref={(el) => (demandRefs.current[index]=el)}><span>{demand.user_field}</span> veut avoir {demand.quantity_field} {demand.title_field}</h5>
              <div className='btns'>           
                <button onClick={() => refuseDemand(demand.id, index)} style={{backgroundColor: '#e74c3c', borderColor: '#e74c3c', marginRight:'5px'}}>refuser</button>
                <button onClick={() => {
                  handleAccept(demand.user_field, user.email, demand.quantity_field, demand.title_field, demand.id_field, demand.id, index)
                }} style={{backgroundColor: '#00e500', borderColor: '#00e500'}}>accepter</button>
              </div>
            </div>
          ))}
      </div>  
    </div>
  )
}
