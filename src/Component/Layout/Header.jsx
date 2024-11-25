import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>Header

      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      <NavLink to={"/infinity"}>Infinity</NavLink>


    </div>
  )
}

export default Header