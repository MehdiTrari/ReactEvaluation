import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from './atoms/cartAtom'; 
import Header from './static/Header/Header'; 
import Footer from './static/Footer/Footer'; 
import './Layout.css';

const Layout = ({ children }) => {
  const [cart] = useAtom(cartAtom);

  return (
    <div className="layout">
      <Header cart={cart} /> 
      <main>
        {children}
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout;
