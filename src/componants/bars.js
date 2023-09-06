import React, {useState, useRef} from 'react'
import '../styles/landing.css'
import { UserAuth } from './context';
import { useNavigate } from 'react-router-dom';

export default function Bars() {
  
    const [imageClass, setImageClass] = useState('');
    const [showX, setShowX] = useState(false);
    const bars = useRef(null);
    const im = useRef(null);
    const p = useRef(null);
    const but = useRef(null);
    const showNav = () => {
      setImageClass('show')
      im.current.classList.add('hide');
      p.current.classList.add('active');
      but.current.classList.add('active');
      setShowX(true);
    }
    const hideNav = () => {
      setImageClass('hide')
      im.current.classList.remove('hide');
      p.current.classList.remove('active');
      but.current.classList.remove('active');
      setShowX(false);
    }

    const { user, logOutContext } = UserAuth();
    const navigate = useNavigate();
    const signOUT = async () => {
      try {
        await logOutContext();
        navigate('/');
        console.log("you're logged out");
      } catch(e) {
        console.log(e);
      }
    } 

  return (
    <div className='bars-div'>
      <nav className={`bars ${imageClass}`} ref={bars}>
        <img src="https://img.icons8.com/?size=512&id=88616&format=png" alt='bars' ref={im} onClick={showNav} />
        {showX && (<img src="https://img.icons8.com/?size=512&id=111056&format=png" alt="x" className='x-rem' onClick={hideNav} />)}
        <p ref={p} className='emailp'>User email: <span>{user && user.email}</span></p>
        <button ref={but} className='log-out' onClick={signOUT}>Log out</button>
      </nav>
    </div>
      
  )
}
