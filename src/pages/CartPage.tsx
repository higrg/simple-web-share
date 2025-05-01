
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../components/ui/use-toast";
import { 
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose 
} from "../components/ui/drawer";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const orderFormSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  phone: z.string().min(1, { message: "Phone number is required" })
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const CartPage = () => {
  const { cart, completeOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      address: user?.address || "",
      phone: ""
    }
  });
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };
  
  const onSubmit = (values: OrderFormValues) => {
    if (completeOrder(values.address, values.phone)) {
      toast({
        title: "Order completed!",
        description: `Your order will be delivered to ${values.address}. We'll contact you at ${values.phone}.`
      });
      setIsDrawerOpen(false);
      navigate("/account");
    }
  };

  const handleOrderClick = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to complete your order",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
    
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty!",
        variant: "destructive"
      });
      return;
    }
    
    setIsDrawerOpen(true);
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
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button 
                className="bg-[#ff385c] hover:bg-[#e31c5f]"
                onClick={handleOrderClick}
              >
                Complete Order
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Complete your order</DrawerTitle>
                  <DrawerDescription>
                    Please provide your delivery details to complete the order.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-2 mt-4">
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                        <Button type="submit" className="bg-[#ff385c] hover:bg-[#e31c5f]">Confirm Order</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      )}
    </Card>
  );
};

export default CartPage;
