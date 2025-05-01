
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Toaster } from "../ui/toaster";
import Footer from "../Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default RootLayout;
