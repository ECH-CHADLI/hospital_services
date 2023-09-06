import React, {useRef, useState} from 'react'
import '../styles/sign.css';
import { UserAuth } from './context';
import { useNavigate } from 'react-router-dom';

const navigation_sens = ['/stock', '/intern', '/complaints', '/stock_user', '/complaints-user']; 

export default function Sign() {
  const signUpRef = useRef(null);
  const logInRef = useRef(null);
  const whichRef = useRef(null);  

  const signing = () => {
    signUpRef.current.classList.remove('hidden');
    whichRef.current.classList.add('hidden');
  };

  const loging = () => {
    logInRef.current.classList.remove('hidden');
    whichRef.current.classList.add('hidden');
  };

  /* database stuff -----------------------------------------------------------------------------*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signUpContext, logInContext } = UserAuth(); //(like an import, they exist in value)
  const navigate = useNavigate();

  let nav = localStorage.getItem('Navigation')
  const cdt = () => {
    if(nav === 'stock_data') {
      navigate(navigation_sens[0]);
    }
    else if(nav === 'intern_data') {
      navigate(navigation_sens[1]);
    }
    else if(nav === 'comp_data') {
      navigate(navigation_sens[2]);
    }
    else if(nav === 'stock_user_data') {
      navigate(navigation_sens[3]);
    }
    else if(nav === 'comp_user_data') {
      navigate(navigation_sens[4]);
    }
  }

  const signUP = async (e) => {
    e.preventDefault(); // prevent the page from being reloaded and lose the state of email and password 
    try {
      await signUpContext(email, password);
      cdt();
      console.log("you've signed up")
    } catch(e) {
      console.log(e);
    }
  }

  const logIN = async (e) => {
    e.preventDefault();
    try {
      await logInContext(email, password);
      cdt();
      console.log("you've logged in");
    } catch(error) {
      setError('Invalid email or password');
    }
  }
  /* done -------------------------------------------------------------------------------------------*/

  return (
      <div className='sign-page'>
        <div className="which" ref={whichRef}>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <button className="sign user-auth" onClick={signing}>Sign up</button>
          <button className="log user-auth" onClick={loging}>Log in</button>
        </div>
        <div className="sign-up hidden" ref={signUpRef}>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form onSubmit={signUP}>
            <h3>Sign Up Here</h3>
    
            <label htmlFor="username">Username</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" id="username" />
    
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" />
    
            <button>Sign Up</button>
            {error && <p>{error}</p>}
{/*             <div className="social">
              <div className="go"><i className="fab fa-google"></i> Google</div>
            </div> */}
          </form>
        </div>
        <div className="log-in hidden" ref={logInRef}>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form onSubmit={logIN}>
            <h3>Login Here</h3>
    
            <label htmlFor="username">Username</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" id="username" />
    
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" />
    
            <button>Log In</button>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </form>
        </div>
      </div>
  );      
}
