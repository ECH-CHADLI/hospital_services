import React, { useEffect, useState, useRef } from 'react'
import { db } from '../firebase'
import { getDocs, collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { UserAuth } from './context'
import emailjs from 'emailjs-com'

export default function Intern() {

  const internCollection = collection(db, 'stagiaire_col')
  const [interns, setInterns] = useState([])
  
  const queryOrd = query(internCollection, orderBy('submission_time', 'asc'))
  const getInterns = async () => {
    const data = await getDocs(queryOrd)
    const allData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setInterns(allData)
  }

  const infoIntern = useRef([]);
  function see_more(index) {
    const infoInternStyle = infoIntern.current[index]
    infoInternStyle.style.display = 'block';
  }

  useEffect(() => {
    getInterns();
  }, [interns])

  const cancelIntern = async (id, index) => {
    localStorage.removeItem(`stagiaire-${index}`);
    try {
      const demandDoc = doc(db, 'stagiaire_col', id);
      await deleteDoc(demandDoc);
    } catch(err) {
      console.log('the error is:' , err);
    }
  } 

  const {user} = UserAuth();
  const acceptRef = useRef([]);
  const acceptBtnRef = useRef([]);

  async function sendAccept(dest_email, index) {
    const email_paramters = {
        to_email: dest_email,
        from_email: user.email,
        mess: "Vous ete accepter, ramener une photocopie de votre carte d'identité, la convention de stage et une photo. Le delai sera 5 jours apres l'envoie de cet email."
    }
    emailjs.send('service_3szw7om', 'template_yfa5d4z', email_paramters, 'Ywo_2LvbmShpQKDeO')
        .then((resp) => {
            console.log('email sent successfully ', resp)
        }).catch((err) => {
            console.log('email sending failed ', err )
        })
    alert('Email envoyer')

    localStorage.setItem(`stagiaire-${index}`, 'https://img.icons8.com/?size=512&id=63760&format=png');

    const acceptStyle = acceptRef.current[index];
    const acceptBtnStyle = acceptBtnRef.current[index];
    acceptStyle.color = 'green';
    acceptBtnStyle.innerText = 'Finis la durée';
  }
    
  return (
    <div className='all-interns'>
        {interns.map((intern, index) => (
            <div className="interns" ref={(el) => acceptRef.current[index]=el}>
            <table>
                <tr>
                    <h1>{intern.name_field} {intern.first_name_field} <span className='see-more' 
                    onClick={() => {see_more(index)}}>plus...</span>
                    {(() => {
                      if(localStorage.getItem(`stagiaire-${index}`)!==null) {
                        return <img src={localStorage.getItem(`stagiaire-${index}`)} style={{height: '30px'}} />
                      }  
                    })()}
                    </h1>
                    <div className="info-intern" ref={(el) => infoIntern.current[index] = el}>
                        <div className="first-part">
                            <h4 className='school'>{intern.school_field} {(() => {
                                if (intern.level_field === '1') {return `${intern.level_field}ére`;}
                                else {return `${intern.level_field}éme`;}
                            })()} année</h4>
                            <h5>Specialty: {intern.specialty_field}</h5>
                            <h5>Department: {intern.select_field}</h5>
                        </div>
                        <div className="desc">
                            <h6>desc</h6>
                            <p>{intern.describe_field}</p>
                        </div>
                        <div className="file">
                            {intern.url_field ? (
                                (() => {
                                const extension = intern.cv_field?.split('.')[1]?.toLowerCase();
                                console.log(extension)
                                if (extension === 'png') {
                                    return <img src={intern.url_field} alt={`CV-${intern.name_field}-${intern.first_name_field}`} />;
                                } else {
                                    return (
                                        <a href={intern.url_field} target='_blank' download={`CV-${intern.name_field}-${intern.first_name_field}`} className='a-download'>
                                            download
                                        </a>
                                    );
                                }
                                })()
                            ) : (
                                <span>Loading...</span>
                            )}
                        </div>
                        <button ref={(el) => acceptBtnRef.current[index]=el} onClick={() => sendAccept(intern.email_field, index, intern.id)}>Accepter demande</button>
                        <a className='refuse' onClick={() => cancelIntern(intern.id, index)}>refuser</a>
                    </div>
                </tr>
            </table>
          </div>
        ))} 
    </div>
  )
}
