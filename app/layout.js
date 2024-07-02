import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ["latin"],weight:"400" });

export const metadata = {
  title: "Animadom",
  description: "Discover comprehensive anime details on Animadom! Explore extensive information on your favorite anime series, characters, and seasons with up-to-date data powered by the Jikan API. Stay connected with the anime world and enjoy a user-friendly experience on our professionally designed platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  
      <body className={`${poppins.className}poppins.className bg-[#121212]  overflow-x-hidden `}>
        <div className=" min-h-screen text-white">
        <Navbar className='absolute'/>
        {children}
        </div>
        <Footer/>
        </body>

    </html>
  );
}
