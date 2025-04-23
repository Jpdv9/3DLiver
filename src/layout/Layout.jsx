import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import PropTypes from 'prop-types';
import './Layout.css'

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Header />
            <main className='layout-content'>{children}</main>
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
  

export default Layout