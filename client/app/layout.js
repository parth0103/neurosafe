"use client"
import { Inter } from 'next/font/google';
import NavbarCommon from './components/global/NavbarCommon';
import { usePathname } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname  = usePathname();
  return (
		<html lang="en">
			<body className={inter.className}>
				{pathname === "/login" ||
				pathname === "/register" ||
				pathname === "/chat" ? (
					<></>
				) : (
					<NavbarCommon />
				)}
				<div className="bg-[#eaeaea]">{children}</div>
			</body>
		</html>
  );
}
