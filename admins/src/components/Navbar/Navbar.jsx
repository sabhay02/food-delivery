import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'

const Navbar = () => {
    return (
        <div className='navbar'>
            <img className='navbar-logo' src={assets.logo} alt="Company Logo" />
            <img className='navbar-profile' src={assets.profile_image} alt="User Profile" />
        </div>
    );
};

export default Navbar;