
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../contexts/FavoritesContext";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Favorites</CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showActions={true}
                showFavoriteRemove={true}
              />
            ))}
          </div>
        ) : (
          <p>No favorites yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesPage;
