
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Category } from "../types";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories: Category[] = ["Action", "Adventure", "RPG", "Strategy"];

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    // Navigate to products page with category filter
    navigate(`/products?category=${category}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryClick(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#ff385c] hover:bg-[#e31c5f] w-full justify-start"
                    : "w-full justify-start"
                }
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CategoriesPage;
