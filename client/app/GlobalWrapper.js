'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { usePathname } from 'next/navigation';

import { createContext, useState, useContext } from 'react';
import NavbarCommon from './components/global/NavbarCommon';
import React, { useEffect } from 'react';
import { searchUsers } from './apis/auth';
export const GlobalContext = createContext();

export const GlobalWrapper = ({ children }) => {
  const pathname = usePathname();

  const [bot, setBot] = useState(true);
  const [user, setuser] = useState('');
  // useEffect(() => {
  //   searchUsers.then((e) => console.log('user', e));
  // }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalContext.Provider value={{ bot, setBot }}>
        {pathname === '/login' ||
        pathname === '/register' ||
        pathname === '/chat' ||
        pathname === '/therapist' ? (
          <></>
        ) : (
          <NavbarCommon bot={bot} />
        )}
        {children}
      </GlobalContext.Provider>
    </LocalizationProvider>
  );
};
