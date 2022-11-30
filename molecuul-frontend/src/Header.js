import React from 'react'
import Login from "./Login";
import './Header.css'
import HamburgerMenu from './HamburgerMenu';
import InstructionTile from './InstructionTile';

function Header() {
  return (
    <div className="Header">
      <h1 className='Header-title'>MoleCuul</h1>
      <InstructionTile />
      {/* <HamburgerMenu/g> */}
    </div>
  )
}

export default Header