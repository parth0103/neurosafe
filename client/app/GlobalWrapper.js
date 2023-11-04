'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import { createContext, useState, useContext } from 'react';
import NavbarCommon from './components/global/NavbarCommon';
import React from 'react';
export const GlobalContext = createContext();

export const GlobalWrapper = ({ children }) => {
  const [bot, setBot] = useState(true);
  return (
    <GlobalContext.Provider value={{ bot, setBot }}>
      <NavbarCommon bot={bot} />
      {children}
    </GlobalContext.Provider>
  );
};
