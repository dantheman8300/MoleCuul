import React from 'react'
import './Header.css'
import Microscope from './icons/microscope_1f52c.png';

function Header() {
  return (
    <div >
      <div className="Header"></div>
      <h1 className='Header-title'>MoleCuul <img className='microscope' src={Microscope} alt='header microscope emoji'/></h1>
    </div>
  )
}

export default Header