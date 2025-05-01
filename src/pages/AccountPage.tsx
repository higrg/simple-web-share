
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import ProductCard from "../components/ProductCard";
import { format } from "date-fns";

const AccountPage = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { orders } = useCart();
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
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 p-4 rounded-md">
                    <div className="flex flex-wrap justify-between mb-2">
                      <p className="font-medium">Order #{order.id.toString().slice(-5)}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(order.date), "MMM d, yyyy")}
                      </p>
                    </div>
                    <p><span className="font-bold">Total:</span> ${order.total.toFixed(2)}</p>
                    <p><span className="font-bold">Delivery Address:</span> {order.address}</p>
                    <p><span className="font-bold">Phone:</span> {order.phoneNumber}</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-[#ff385c] hover:underline">
                        View Items ({order.items.length})
                      </summary>
                      <ul className="pl-5 mt-2 list-disc">
                        {order.items.map((item) => (
                          <li key={`${order.id}-${item.id}`} className="text-sm">
                            {item.name} - ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ))}
              </div>
            ) : (
              <p>No orders yet.</p>
            )}
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
