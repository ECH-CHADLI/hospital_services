import React, { useState } from 'react'
import '../styles/intern.css'
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage } from '../firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import img1 from "../styles/ressources/satisified-muslim-college-student-with-notepad-papers_273609-27054-removebg-preview.png"
import img2 from "../styles/ressources/young-brunette-woman-holding-notepads_273609-41251-removebg-preview.png"

export default function InternUser() {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [level, setLevel] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [describe, setDescribe] = useState('');
  const [selectField, setSelectField] = useState('');
  const [cvUpload, setCvUpload] = useState(null); //upload file

  const stagiaireCollection = collection(db, 'stagiaire_col');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!cvUpload) {
        alert('Please select a file.');
        return;
      }
      
      const cvRefs = ref(storage, `cv/${cvUpload.name}`)
      uploadBytes(cvRefs, cvUpload).then(() => { //upload to firebase
        alert('form submitted!')
      })

      // Get the download URL of the file
      const downloadURL = await getDownloadURL(cvRefs);
      alert('File uploaded and URL stored successfully!');

      await addDoc(stagiaireCollection, {
        name_field: name,
        first_name_field: firstName,
        email_field: email,
        school_field: school,
        level_field: level,
        specialty_field: specialty,
        select_field: selectField,
        describe_field: describe,
        cv_field: cvUpload.name,
        url_field: downloadURL,
        submission_time: serverTimestamp()
      })
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className='formulaire'>
        <h1>Formulaire des stagiaires</h1>
        <img src={img1} className='img-1' alt="" />
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">Nom</label>
            <input onChange={(e) => {setName(e.target.value)}} type="text" placeholder='last name' />
            <label htmlFor="">Prenom</label>
            <input onChange={(e) => {setFirstName(e.target.value)}} type="text" placeholder='first name' />
            <label htmlFor="">Email</label>
            <input type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder='email' />
            <label htmlFor="">Ecole</label>
            <input onChange={(e) => {setSchool(e.target.value)}} type="text" placeholder='school' />
            <label htmlFor="">Niveau</label>
            <input onChange={(e) => {setLevel(e.target.value)}} type="text" placeholder='level' />
            <label htmlFor="">Specialité</label>
            <input onChange={(e) => {setSpecialty(e.target.value)}} type="text" placeholder='specialty' />
            <label htmlFor="">Dans quelle service voulez vous travailler</label>
            <select name="mySelect" onChange={(e) => setSelectField(e.target.value)}>
              <option value="nursing">nursing</option>
              <option value="doctring">doctring</option>
              <option value="direction">direction</option>
              <option value="digital">digital</option>
            </select>
            <label htmlFor="">describe</label>
            <textarea onChange={(e) => {setDescribe(e.target.value)}} name="" id="" cols="30" rows="10" placeholder='desc'></textarea>
            <label htmlFor="">CV</label>
            <input type="file" onChange={(e) => {setCvUpload(e.target.files[0])}} 
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#e3e3e3',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
            }}/>
            <button>Demande</button>
        </form>
        <img src={img2} className='img-2' alt="" />
      </div>
    </div>
  )
}
