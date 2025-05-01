
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../components/ui/use-toast";

const CartPage = () => {
  const { cart, completeOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };
  
  const handleCompleteOrder = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to complete your order",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
    
    if (completeOrder()) {
      navigate("/account");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showActions={true}
                showCartRemove={true}
              />
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </CardContent>
      {cart.length > 0 && (
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-4 sm:mb-0">
            Total: ${calculateTotal()}
          </div>
          <Button 
            onClick={handleCompleteOrder}
            className="bg-[#ff385c] hover:bg-[#e31c5f]"
          >
            Complete Order
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CartPage;
