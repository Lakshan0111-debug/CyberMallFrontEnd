import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import CyberMallLogo from '../../assets/CyberMallLogo.png';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={CyberMallLogo} alt=''/>
                    <p>Loren Ipsun is simly dummy text of the printing and typesetting industry.</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt=''/>
                        <img src={assets.twitter_icon} alt=''/>
                        <img src={assets.linkedin_icon} alt=''/>
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li></li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>0762690015</li>
                        <li>srashenb@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className='footer-copyright'>Copyright 2024 @ CyberMall.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer;