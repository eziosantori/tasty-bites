import { Utensils } from "lucide-react";
import { SiFacebook, SiX, SiInstagram, SiPinterest } from '@icons-pack/react-simple-icons';
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-neutral-500 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/">
                <span className="flex items-center gap-2 mb-4">
                <Utensils className="text-white text-3xl" />
                <h2 className="text-xl font-display font-bold text-white">
                    <span className="text-primary-light">Tasty</span>Bites
                </h2>
                </span>
            </Link>
            <p className="text-neutral-200 text-sm mb-4">
                Discover delicious recipes from around the world, save your favorites, and become a better cook.
            </p>
            <div className="flex gap-4">
                <a href="#" className="text-neutral-200 hover:text-white transition-all">
                <SiFacebook size={24} />
                </a>
                <a href="#" className="text-neutral-200 hover:text-white transition-all">
                <SiX size={24} />
                </a>
                <a href="#" className="text-neutral-200 hover:text-white transition-all">
                <SiInstagram size={24} />
                </a>
                <a href="#" className="text-neutral-200 hover:text-white transition-all">
                <SiPinterest size={24} />
                </a>
            </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-neutral-400 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-200 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TastyBites. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-neutral-200 hover:text-white text-sm transition-all">Privacy Policy</a>
            <a href="#" className="text-neutral-200 hover:text-white text-sm transition-all">Terms of Service</a>
            <a href="#" className="text-neutral-200 hover:text-white text-sm transition-all">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
