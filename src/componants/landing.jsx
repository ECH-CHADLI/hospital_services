import React, {useRef} from 'react'
import '../styles/landing.css'
import imgChu from '../styles/ressources/chu-removebg-preview.png'

export const sendNav = (index) => {
  const navigations = ['stock_data', 'intern_data', 'comp_data', 'stock_user_data', 'comp_user_data']
  localStorage.setItem('Navigation', navigations[index])
};

export default function Landing() {

    return (
      <div className='body'>
        <nav id="navbar">
          <img src={imgChu} alt="chu-log-png" />
          <ul>
            <li><a href="/" className="map">Home</a></li>
            <li><a href="https://www.google.com/maps/place/Centre+Hospitalier+Universitaire+Mohammed+VI/@34.6562305,-1.9127232,17z/data=!3m1!4b1!4m6!3m5!1s0xd787b588e3b69cd:0x6c8a1da16bc171e1!8m2!3d34.6562305!4d-1.9105345!16s%2Fg%2F11fmgwy74r?entry=ttu" target="_blank" className="map">Map</a></li>
            <li>Theme</li>
          </ul>
        </nav>
  
        <nav id="side-navbar">
          <ul className="naving">
            <li>
              <a href="/sign" id="stock" className="nav-link stock_data" onClick={()=>{
                console.log('is it working');
                sendNav(0)}}>
                <span className="nav-text">Gestion de stocks</span>
                <img src="https://img.icons8.com/?size=512&id=myCQWM8POErN&format=png" alt="fff" style={{ width: '40px', height: '40px' }} className="nav-img" />
              </a>
            </li>
            <li>
              <a href="/sign" id="stag" className="nav-link intern_data" onClick={()=>{
                console.log('is it working');
                sendNav(1)}}>
                <span className="nav-text">Gestion de stagiaires</span>
                <img src="https://img.icons8.com/?size=512&id=Ux0A3xSKSDeQ&format=png" alt="fff" style={{ width: '40px', height: '40px' }} className="nav-img" />
              </a>
            </li>
            <li>
              <a href="/sign" id="complaints" className="nav-link comp_data" onClick={()=>{
                console.log('is it working');
                sendNav(2)}}>
                <span className="nav-text">Plaintes</span>
                <img src="https://img.icons8.com/?size=512&id=2NXY9eJEoT6O&format=png" alt="fff" style={{ width: '40px', height: '40px' }} className="nav-img" />
              </a>
            </li>
          </ul>
          <span className='admin-side'><i>admin</i></span>
        </nav>
  
        <main id="main">
          <div className="gen-info">
            <h1>Bienvenue a CHU Oujda</h1>
            <img src="https://www.omteq.com/omnium/uploads/2018/12/Image-129-2.jpg" alt="CHU pic" />
          </div>
  
          <div className="cards-info">
            <div className="container">
              <div className="box">
                <strong>Pour les employés</strong>
                <span className="title">Gestion de stock</span>
                <a href="/sign" className='user-link stock_user_data' onClick={()=>{
                console.log('is it working');
                sendNav(3)}}>
                  <button className="user-auth">Enter</button>
                </a>
              </div>
            </div>
  
            <div className="container">
              <div className="box">
                <strong>Pour les etudiants</strong>
                <span className="title">Gestion des stagiaires</span>
                <a href="/intern-user" className='user-link'>
                  <button className="user-auth">Enter</button>
                </a>
              </div>
            </div>
  
            <div className="container">
              <div className="box">
                <strong>Quiconque</strong>
                <span className="title">Les plaintes</span>
                <a href="/sign" className='user-link comp_user_data' onClick={()=>{
                console.log('is it working');
                sendNav(4)}}>
                  <button className="user-auth">Enter</button>
                </a>
              </div>
            </div>
          </div>
        </main>
  
        <footer className="footer">
          <div className="footer-links">
            <a href="http://www.chuoujda.ma/" target='_blank'>Main website</a>
            <a href="https://www.linkedin.com/feed/" target='_blank'>Socials</a>
          </div>
          <p>©2023 copyright, CHU Oujda</p>
        </footer>
      </div>
    );
  }
  