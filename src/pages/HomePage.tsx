
import { useState } from "react";
import { Input } from "../components/ui/input";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-lg mx-auto my-8">
        <Input
          type="text"
          placeholder="Search for games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
