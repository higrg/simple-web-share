
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../contexts/AuthContext";
import { 
  Home, 
  UserPlus, 
  User, 
  Info, 
  Mail, 
  LayoutGrid, 
  ShoppingBag, 
  Heart, 
  ShoppingCart, 
  LogIn, 
  LogOut 
} from "lucide-react";

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      setEmail("");
      setPassword("");
      navigate("/account");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          <Link to="/" className="text-2xl font-bold text-[#ff385c]">
            GameShop
          </Link>

          {!user ? (
            <form onSubmit={handleLogin} className="flex flex-col md:flex-row gap-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-auto"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full md:w-auto"
              />
              <Button type="submit" className="w-full md:w-auto bg-[#ff385c] hover:bg-[#e31c5f]">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </form>
          ) : (
            <Button onClick={handleLogout} className="bg-[#ff385c] hover:bg-[#e31c5f]">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-0">
            <Link to="/" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/register" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <UserPlus className="h-4 w-4" />
              <span>Register</span>
            </Link>
            <Link to="/account" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
            <Link to="/about" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link to="/categories" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <LayoutGrid className="h-4 w-4" />
              <span>Categories</span>
            </Link>
            <Link to="/products" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <ShoppingBag className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link to="/favorites" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-1 text-gray-800 hover:text-[#ff385c]">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
