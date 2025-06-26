import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>
                Choose from a diverse menu featuring a delectable array
            </p>
            <div className='explore-menu-list'>
                {menu_list.map((item, index) => (
                    <div 
    key={index}
    onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
    className={`menu-category ${category === item.menu_name ? "active" : ""}`}
  >
    <img
      src={item.menu_image}
      alt={item.menu_name}
    />
    <p>{item.menu_name}</p>
  </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreMenu;