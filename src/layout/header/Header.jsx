import { NavLink } from 'react-router';
import { useState } from 'react';
import { GiLiver } from 'react-icons/gi';
import { IoMdHome, IoMdNotificationsOutline } from "react-icons/io";
import { RiBookShelfLine } from "react-icons/ri";
import { HiLightBulb } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { IoArrowBack, IoChevronDown, IoChevronUp } from "react-icons/io5";
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Abrir el menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar el menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Controlar el submenu
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div className='app-container'>
      {/* Menu */}
      <aside className={`sidebar ${isMenuOpen ? '' : 'hidden'}`}>
        <div className='sidebar-button-container'>
          <button 
            className='sidebar-button' 
            onClick={closeMenu}
            type="button"
          >
            <IoArrowBack className='sidebar-icon-back' />
          </button>
        </div>
        <div className='sidebar-logo'>
          <img src="/imagenes/logo/3DLIVER Logotipo Blanco.svg" alt="3DLIVER logo" />
        </div>
        <nav className='sidebar-menu'>
          <NavLink to="/" className="sidebar-item" activeClassName="active">
            <IoMdHome className='sidebar-icon'/> Inicio
          </NavLink>
          
          {/* Elemento de Enfermedades con submenú */}
          <div className="sidebar-item-with-submenu">
            <div 
              className="sidebar-item submenu-trigger" 
              onClick={toggleSubmenu}
            >
              <GiLiver className='sidebar-icon'/>
              Enfermedades
              {/* Ícono para indicar si el submenú está abierto o cerrado */}
              {isSubmenuOpen ? (
                <IoChevronUp className='submenu-icon' />
              ) : (
                <IoChevronDown className='submenu-icon' />
              )}
            </div>
            
            {/* Submenú de enfermedades */}
            <div className={`submenu ${isSubmenuOpen ? 'open' : ''}`}>
              <NavLink to="/higado/hepatitis-viral" className="submenu-item" activeClassName="active">
                Hepatitis Viral
              </NavLink>
              <NavLink to="/higado/higado-graso" className="submenu-item" activeClassName="active">
                Higado Graso
              </NavLink>
              <NavLink to="/higado/cancer-higado" className="submenu-item" activeClassName="active">
                Cancer De Higado
              </NavLink>
              <NavLink to="/higado/cirrosis-hepatica" className="submenu-item" activeClassName="active">
                Cirrosis Hepática
              </NavLink>
            </div>
          </div>
          
          <NavLink to="/quiz" className="sidebar-item" activeClassName="active">
            <HiLightBulb className='sidebar-icon'/> Quiz
          </NavLink>
          <NavLink to="/recursos" className="sidebar-item" activeClassName="active">
            <RiBookShelfLine className='sidebar-icon'/>
            Recursos
          </NavLink>
          <NavLink to="/contacto" className="sidebar-item" activeClassName="active">
            <FaEnvelope className='sidebar-icon' />
            Contactos
          </NavLink>
          <NavLink to="/sobre-nosotros" className="sidebar-item" activeClassName="active">
            <CiCircleInfo className='sidebar-icon'/>
            Acerca de nosotros
          </NavLink>
        </nav>
      </aside>

      <div className={`main-container ${isMenuOpen ? '' : 'expanded'}`}>
        {/* Header */}
        <header className='header'>
          <div className='hamburger-menu' onClick={toggleMenu}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>

          <div className='search-container'>
            <input type='search' className='search-input' placeholder='Buscar'/>
            <button className='search-button'>
              <CiSearch className='search-icon'/>
            </button>
          </div>

          <div className='user-container'>
            <div className='notification-container'>
              <button className='notification-button'>
                <IoMdNotificationsOutline className='notification-icon'/>
              </button>
            </div>
            <div className='user-profile'>
              <div className='user-info'>
                <span className='user-name'>Usuario</span>
                <img src='/imagenes/user/user.png' alt="Perfil de usuario" className='user-avatar'/>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;