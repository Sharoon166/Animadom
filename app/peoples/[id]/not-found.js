import { FaHome } from "react-icons/fa";
import Link from "next/link";
export const metadata = {
  title: "Animadom | Not Found",
};
const notf = () => {
  return (
    <div className="flex justify-center flex-col gap-4 items-center ">
      <img
        src="/404.png"
        alt=""
        className="object-cover object-center w-full invert  md:w-1/3 m-auto"
      />
      <h2 className="text-yellow-500 p-8 flex justify-center items-center gap-2 text-2xl ">Kore Person Exists Jenai (Its a free API so it has its limitations 💀)</h2>
        <Link href="/" className="text-yellow-500 flex justify-center items-center gap-2 text-2xl px-4 py-2 border-yellow-600 border rounded-lg hover:bg-yellow-600 hover:text-[#121212]  font-mono transition-colors duration-150">
           <FaHome className="inline-block"/> Home
        </Link>
      
    </div>
  );
};

export default notf;
