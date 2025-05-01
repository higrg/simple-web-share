
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About GameShop</h3>
            <p className="text-gray-300 mb-4">
              GameShop is your premier destination for video games, offering a curated selection of action, adventure, RPG, and strategy titles.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#ff385c]" />
                <a href="mailto:gannatgamal995@gmail.com" className="text-gray-300 hover:text-white">
                  gannatgamal995@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#ff385c]" />
                <span className="text-gray-300">+20 123 456 7890</span>
              </li>
            </ul>
          </div>

          {/* Team Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Team</h3>
            <ul className="text-gray-300 space-y-1">
              <li>Gannat Ahmed Mohamed 30713</li>
              <li>Mohamed Ahmed Nabawy⁩ 30756</li>
              <li>Mohamed Rasmy Goda 30742</li>
              <li>Injy Hany Mohamed 30763</li>
              <li>Basmalh Ahmed Mahmoud 30373</li>
              <li>Mahmoud Taher Alzaki 64247</li>
            </ul>
          </div>
        </div>

        {/* Social Media and Navigation Links */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} GameShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
