import React, { useEffect, useRef, useState } from 'react'
import { getDocs, deleteDoc, doc, collection, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from './context'
import { plainteCollection } from './complaints-user'
import emailjs from 'emailjs-com'

export default function Complaints() {
    
  const [userComplaint, setUserComplaint] = useState([])
  const {user} = UserAuth()
  const getComplaints = async () => {
    try{
        const data = await getDocs(plainteCollection)
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setUserComplaint(filteredData)
    } catch(err) {
        console.error(err)
    }
  }
  const deleteComment = async (id) => {
    try {
        const plainteDoc = doc(db, 'plainte_col', id);
        await deleteDoc(plainteDoc);
    } catch(err) {
        console.log('the error is:' , err);
    }
  }
  useEffect(() => {
    getComplaints()
  })

  const textArea = useRef([]);
  function repondre(index) {
    const textAreaStyle = textArea.current[index]
    textAreaStyle.style.display = 'block';
  }
  function repondreDbl(index) {
    const textAreaStyle = textArea.current[index]
    textAreaStyle.style.display = 'none';
  }

  const [textField, setTextField] = useState('')
  function envoyer_email(dest_email) {
    const email_parameter = {
        to_email: dest_email,
        from_email: user.email,
        mess: textField
    }
    emailjs.send('service_3szw7om', 'template_yfa5d4z', email_parameter, 'Ywo_2LvbmShpQKDeO')
        .then((resp) => {
            console.log('email sent successfully ', resp)
        }).catch((err) => {
            console.log('email sending failed ', err )
        })
    alert('Email envoyer')
  }

  return (
    <div className='every-complaint'>
        <h1>Les plaintes</h1>
        {userComplaint.map((comp, index) => (
            <div className="each-complaint" key={comp.id}>
                <div className='comment'>
                    <h2>{comp.p_email_field.split('@')[0]}</h2>
                    <p>{comp.p_textarea}</p> 
                    <a onClick={() => repondre(index)} onDoubleClick={()=>repondreDbl(index)}>répondre</a>
                    <div className="hidden-area" ref={(el) => textArea.current[index]=el}>
                        <textarea onChange={(e) => setTextField(e.target.value)}
                        placeholder='Email de réponse' cols="30" rows="10"></textarea>
                        <button onClick={() => envoyer_email(comp.p_email_field)}>Envoyer</button>
                    </div>   
                </div>
                <span onClick={() => {
                    deleteComment(comp.id)
                    console.log(comp.id)}}>x</span>
            </div>
        ))}
    </div>
  )
}
