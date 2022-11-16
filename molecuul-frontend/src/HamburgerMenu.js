import React, {useState, useEffect} from 'react';
import { slide as Menu } from "react-burger-menu";
import Sidebar from "./Sidebar";

const toggleMenu = ({ isOpen }) => {
    const menuWrap = document.querySelector(".bm-menu-wrap");
    isOpen
      ? menuWrap.setAttribute("aria-hidden", false)
      : menuWrap.setAttribute("aria-hidden", true);
  };

function HamburgerMenu (props) {
    return (
        <Menu right noOverlay onStateChange={toggleMenu} width={250} height={200}>
        
        <a className="menu-item" href="/">
          <h1>Login</h1>
        </a>
      </Menu>    
      )
}

export default HamburgerMenu;