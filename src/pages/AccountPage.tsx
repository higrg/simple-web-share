
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import ProductCard from "../components/ProductCard";

const AccountPage = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium mb-2">Account Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><span className="font-bold">Name:</span> {user.firstname} {user.lastname}</p>
            <p><span className="font-bold">Email:</span> {user.email}</p>
            <p><span className="font-bold">Country:</span> {user.country}</p>
            <p><span className="font-bold">Address:</span> {user.address}</p>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-2">My Orders</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p>No orders yet.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <p>No favorites yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
