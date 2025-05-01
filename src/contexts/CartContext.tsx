
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Product, Order } from "../types";
import { toast } from "../components/ui/use-toast";

interface CartContextType {
  cart: Product[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  completeOrder: (address: string, phoneNumber: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const addToCart = (product: Product) => {
    if (!cart.some(item => item.id === product.id)) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Already in cart",
        description: `${product.name} is already in your cart.`,
      });
    }
  };

  const removeFromCart = (productId: number) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast({
        title: "Removed from cart",
        description: `${product.name} has been removed from your cart.`,
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const completeOrder = (address: string, phoneNumber: string) => {
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty!",
        variant: "destructive",
      });
      return false;
    }
    
    const newOrder: Order = {
      id: Date.now(),
      items: [...cart],
      date: new Date().toISOString(),
      total: cart.reduce((sum, item) => sum + item.price, 0),
      address: address,
      phoneNumber: phoneNumber,
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order completed!",
      description: "Thank you for your purchase.",
    });
    clearCart();
    return true;
  };

  const value = {
    cart,
    orders,
    addToCart,
    removeFromCart,
    clearCart,
    completeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
