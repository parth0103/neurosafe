'use client';
import { Inter } from 'next/font/google';
import NavbarCommon from './components/global/NavbarCommon';
import { usePathname } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import { GlobalWrapper } from './GlobalWrapper';

import { Provider } from 'react-redux';
import store from '@/store';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalWrapper>
          {pathname === '/login' ||
          pathname === '/register' ||
          pathname === '/chat' ||
          pathname === '/therapist' ? (
            <></>
          ) : (
            <NavbarCommon />
          )}
          <div className="bg-[#eaeaea]">
            <Provider store={store}>{children}</Provider>
          </div>
        </GlobalWrapper>
      </body>
    </html>
  );
}
