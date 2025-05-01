
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Product } from "../types";
import { toast } from "../components/ui/use-toast";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (product: Product) => {
    if (!favorites.some(item => item.id === product.id)) {
      const updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
      });
    } else {
      toast({
        title: "Already in favorites",
        description: `${product.name} is already in your favorites.`,
      });
    }
  };

  const removeFromFavorites = (productId: number) => {
    const product = favorites.find(item => item.id === productId);
    if (product) {
      const updatedFavorites = favorites.filter(item => item.id !== productId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`,
      });
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
