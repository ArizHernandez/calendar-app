import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <NavLink to="/" className="ms-2 navbar-brand">Nombre</NavLink>

      <button className="btn btn-danger ms-auto me-2">
      <i className="fas fa-sign-out-alt"></i> LogOut 
      </button>
    </nav>
  )
}
