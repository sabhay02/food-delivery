import React from 'react';
import { assets } from '../../assets/assets';
import './Sidebar.css';
import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-options'>
                <Link to='/add' className='sidebar-option'>
                    <img src={assets.add_icon} alt="Add Items" />
                    <p>Add Items</p>
                </Link>
                <Link to='/list' className='sidebar-option'>
                    <img src={assets.order_icon} alt="List Items" />
                    <p>List Items</p>
                </Link>
                <Link to='/orders' className='sidebar-option'>
                    <img src={assets.order_icon} alt="Orders" />
                    <p>Orders</p>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;