'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/common-components/Header";
import Footer from "./components/common-components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const noHeaderFooter = ['/about-us', '/data'];

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
 
  const route = usePathname();
  const ifShowCompos = !noHeaderFooter.includes(route)

  return (
    <html lang="en">
      <body className={inter.className}>
        {ifShowCompos && <Header/>}
        {children}
        {ifShowCompos && <Footer/>}
        </body>
    </html>
  );
}
