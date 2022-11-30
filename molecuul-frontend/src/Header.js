import React from 'react'
import Login from "./Login";
import './Header.css'
import HamburgerMenu from './HamburgerMenu';
import InstructionTile from './InstructionTile';
import Microscope from './icons/microscope_1f52c.png';

function Header() {
  return (
    <div >
      <div className="Header"></div>
      <h1 className='Header-title'>MoleCuul <img className='microscope' src={Microscope} /></h1>
      {/* <HamburgerMenu/g> */}
    </div>
  )
}

export default Header