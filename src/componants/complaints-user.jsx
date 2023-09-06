import React, { useState } from 'react'
import '../styles/complaints.css'
import { db } from '../firebase'
import { UserAuth } from './context'
import { addDoc, collection } from 'firebase/firestore'
export const plainteCollection = collection(db, 'plainte_col')

export default function ComplaintsUser() {

  const [textareaValue, setTextareaValue] = useState('')
  const {user} = UserAuth()
  const envoyer_plainte = async () => {
    await addDoc(plainteCollection, {
      p_email_field: user.email,
      p_textarea: textareaValue 
    })
    alert('Message envoyer')
  }

  return (
    <div className='complaining'>
      <h3>On est ouvert a votre plaintes, pour ameliorer notre service &#128515;</h3>
      <div class="form-comp">
        <textarea onChange={(e) => {setTextareaValue(e.target.value);}} 
        className="input" value={textareaValue} placeholder="Decrire votre probleme" required="" type="text"></textarea>
        <span class="input-border"></span>
      </div>
      <button onClick={()=>envoyer_plainte()}>Envoyer</button>
    </div>
  )
}
