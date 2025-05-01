
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
  LogOut,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "../hooks/use-mobile";

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isMobile = useIsMobile();

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

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
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
  );

  const AuthSection = () => (
    !user ? (
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
    )
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4 gap-4">
          <div className="flex items-center">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                  <div className="py-4">
                    <h2 className="text-xl font-bold mb-4 text-[#ff385c]">GameShop</h2>
                    <NavLinks />
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <Link to="/" className="text-2xl font-bold text-[#ff385c]">
              GameShop
            </Link>
          </div>

          {!isMobile && <AuthSection />}
          
          {isMobile ? (
            <div className="flex items-center">
              {user ? (
                <Button onClick={handleLogout} className="bg-[#ff385c] hover:bg-[#e31c5f]">
                  <LogOut className="h-4 w-4" />
                </Button>
              ) : (
                <Link to="/account">
                  <User className="h-5 w-5 text-gray-800" />
                </Link>
              )}
            </div>
          ) : (
            <NavLinks />
          )}
        </nav>
        
        {isMobile && (
          <div className="pb-4">
            {!user && (
              <form onSubmit={handleLogin} className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="bg-[#ff385c] hover:bg-[#e31c5f]">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
