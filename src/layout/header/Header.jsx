import { NavLink } from 'react-router';
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import './Header.css';

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='header'>
      <div className='header-left'>
        <div className='hamburger-menu' onClick={toggleMenu}>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <NavLink to="/" className="home-header-button" aria-label='Ir al inicio'>
          <img src='/imagenes/logo/3DLIVER Logo.svg' alt='Inicio' className='logo-header'/>
          <img src='/imagenes/logo/3DLIVER Tipografia.svg' alt='3DLIVER' className='logo-text-header'/>
        </NavLink>
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
  );
};

export default Header;