
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "../components/ui/input";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Product, Category } from "../types";

const ProductsPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);

  useEffect(() => {
    // Parse category from URL query parameter
    const params = new URLSearchParams(location.search);
    const category = params.get("category") as Category | null;
    setCategoryFilter(category);

    // Apply filters
    filterProducts(searchTerm, category);
  }, [location.search]);

  const filterProducts = (search: string, category: Category | null) => {
    let result = products;
    
    // Apply search filter
    if (search) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category) {
      result = result.filter(product => product.category === category);
    }
    
    setFilteredProducts(result);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(value, categoryFilter);
  };

  return (
    <div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-md"
        />
        {categoryFilter && (
          <div className="mt-2 text-sm">
            Filtering by: <span className="font-bold">{categoryFilter}</span>
          </div>
        )}
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

export default ProductsPage;
