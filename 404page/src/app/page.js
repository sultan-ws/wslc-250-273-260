import Image from "next/image";
import Link from "next/link";
import { BsAmazon } from "react-icons/bs";
import { FaAngular, FaContao, FaWhatsapp } from "react-icons/fa6";

export default function Home() {
  return (
   <div>
    <h1 className="text-center text-2xl">Home Page</h1>
    <div>
      <Link href='/contact'>Contact</Link>
      <Link href='/about-us'>About</Link>
      <BsAmazon />
      <FaAngular />
      <FaWhatsapp/>
      <FaContao/>
    </div>
   </div>
  );
}
