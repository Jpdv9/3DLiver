import { NavLink } from 'react-router';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header'>
      <div className='logo-container'>
        <img src='/imagenes/logo/3DLIVER Logotipo.svg' alt='logo Empresa' className='logo-img' to/>
      </div>

      <div className='top-navigation-main'>
        <nav className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>

          <div className='nav-links'>
            <NavLink to='/' exact className='nav-link' activeClassName='active'>
              Inicio
            </NavLink>

            <div className='dropdown'>
              <NavLink to='/higado' className='nav-link' activeClassName='active'>
                Enfermedades
              </NavLink>
              <div className='dropdown-content'>
                <NavLink to='/higado/hepatitis-viral' className='dropdown-link'>
                  Hepatitis Viral
                </NavLink>
                <NavLink to='/higado/cirrosis-hepatica' className='dropdown-link'>
                  Cirrosis Hepática
                </NavLink>
                <NavLink to='/higado/cancer-higado' className='dropdown-link'>
                  Cáncer Hígado
                </NavLink>
                <NavLink to='/higado/higado-graso' className='dropdown-link'>
                  Hígado Graso
                </NavLink>
              </div>
            </div>

            <NavLink to='/quiz' className='nav-link' activeClassName='active'>
              Quiz
            </NavLink>
          </div>

          <div className='auth-buttons'>
            <NavLink to='/login' className='btn login-btn'>
              Iniciar Sesión
            </NavLink>
            <NavLink to='/register' className='btn register-btn'>
              Registrarse
            </NavLink>
          </div>
        </nav>
      </div>

      
    </header>
  );
};

export default Header;
