
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import RootLayout from "./components/layouts/RootLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
