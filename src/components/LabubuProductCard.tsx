import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Eye, ShoppingCart } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

interface LabubuProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string; // Used to create a unique link to the product detail page
}

const LabubuProductCard: React.FC<LabubuProductCardProps> = ({ id, name, price, imageUrl, slug }) => {
  console.log(`LabubuProductCard loaded for: ${name} (ID: ${id})`);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent navigation if the card itself or parent elements are links
    event.preventDefault(); 
    event.stopPropagation();
    
    // In a real application, this would typically dispatch an action to a state management system (e.g., Redux, Zustand)
    // or call an API to add the item to the cart.
    console.log(`Adding product ${id} (${name}) to cart.`);
    
    sonnerToast.success(`${name} added to your cart!`, {
      description: "You can continue shopping or view your cart.",
      // Action buttons in toasts can be added here if needed, e.g., a "View Cart" button
      // that uses react-router-dom's navigate function.
    });
  };

  // Construct the URL for the product detail page, using query parameters
  // as App.tsx defines /product-detail as a static route.
  const productDetailUrl = `/product-detail?slug=${slug}`;

  return (
    <Card className="w-full overflow-hidden rounded-xl shadow-lg hover:shadow-pink-300/50 transition-all duration-300 ease-in-out group bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border border-pink-200 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link to={productDetailUrl} aria-label={`View details for ${name}`}>
          <AspectRatio ratio={1}> {/* Ensures a consistent square aspect ratio for images */}
            <img
              src={imageUrl || 'https://via.placeholder.com/400x400?text=Labubu+Doll'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </AspectRatio>
        </Link>
      </CardHeader>

      <CardContent className="p-4 space-y-2 text-center flex-grow">
        <h3 className="text-lg md:text-xl font-bold text-purple-700 group-hover:text-pink-600 transition-colors duration-300 min-h-[2.5em] line-clamp-2">
          <Link to={productDetailUrl} className="focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-sm">
            {name}
          </Link>
        </h3>
        <p className="text-xl md:text-2xl font-semibold text-pink-500">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-3 md:p-4 mt-auto bg-white/30 backdrop-blur-sm border-t border-pink-100/80">
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="flex-1 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 rounded-lg group/button text-sm py-2.5"
            asChild
          >
            <Link to={productDetailUrl}>
              <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-500 group-hover/button:text-white transition-colors duration-300" />
              View Details
            </Link>
          </Button>
          <Button
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300 rounded-lg group/button text-sm py-2.5"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white transition-colors duration-300" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LabubuProductCard;