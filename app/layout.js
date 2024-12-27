import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from '@/components/useLanguage';
import Providers from "./providers";

const poppins = Poppins({ subsets: ["latin"],weight:"400" });

export const metadata = {
  title: "Animadom",
  description: "Animadom - Your Ultimate Destination for Anime and Animation",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}poppins.className bg-[#121212] overflow-x-hidden`}>
        <LanguageProvider>
          <div className="min-h-screen text-white">
            <Navbar className='absolute'/>
            <Providers>
            {children}
            </Providers>
          </div>
          <Footer/>
        </LanguageProvider>
      </body>
    </html>
  );
}


