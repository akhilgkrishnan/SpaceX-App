import React from 'react'
import './index.scss'
import logo from '../../assets/spacex-logo.svg';

function Header() {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
    </div>
  )
}

export default Header;

