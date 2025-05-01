
import { Product } from "../types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  showFavoriteRemove?: boolean;
  showCartRemove?: boolean;
}

const ProductCard = ({
  product,
  showActions = true,
  showFavoriteRemove = false,
  showCartRemove = false,
}: ProductCardProps) => {
  const { addToCart, removeFromCart } = useCart();
  const { addToFavorites, removeFromFavorites } = useFavorites();

  return (
    <Card className="overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.description}</p>
        <p className="font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      {showActions && (
        <CardFooter className="flex flex-wrap gap-2 p-4 pt-0">
          {!showCartRemove ? (
            <Button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-[#ff385c] hover:bg-[#e31c5f]"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          ) : (
            <Button 
              onClick={() => removeFromCart(product.id)}
              variant="destructive"
              className="flex-1"
            >
              Remove from Cart
            </Button>
          )}
          
          {!showFavoriteRemove ? (
            <Button 
              onClick={() => addToFavorites(product)}
              variant="secondary"
              className="flex-1"
            >
              <Heart className="mr-2 h-4 w-4" />
              Favorite
            </Button>
          ) : (
            <Button 
              onClick={() => removeFromFavorites(product.id)}
              variant="outline"
              className="flex-1"
            >
              Remove from Favorites
            </Button>
          )}
          
          <div className="flex gap-2 w-full mt-2">
            <Link to="/favorites" className="text-sm text-[#ff385c] hover:underline">
              My Favorites
            </Link>
            <Link to="/cart" className="text-sm text-[#ff385c] hover:underline ml-auto">
              My Cart
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
