import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
    <h1 className="text-center text-2xl">Home Page</h1>
    <div>
      <Link href='/contact'>Contact</Link>
      <Link href='/about-us'>About</Link>
    </div>
   </div>
  );
}
