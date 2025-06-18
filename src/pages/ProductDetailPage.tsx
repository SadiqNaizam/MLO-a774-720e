import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductGallery from '@/components/ProductGallery'; // Custom component
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Heart, Star, Package, RotateCcw, Home, Shirt, ToyBrick } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

// Placeholder data for a product
const placeholderProduct = {
  id: 'labubu-lulu-lamb',
  name: 'Lulu the Lamb - Dreamy Meadow Collection',
  price: 59.99,
  images: [
    { id: 'img1', src: 'https://cdn.popmart.com/media/catalog/product/cache/e4f266b495239b3722f109e5fd58f1d0/_/7/_750-750_1_201.jpg', alt: 'Lulu the Lamb front view' },
    { id: 'img2', src: 'https://cdn.popmart.com/media/catalog/product/cache/e4f266b495239b3722f109e5fd58f1d0/_/7/_750-750_2_176.jpg', alt: 'Lulu the Lamb side view' },
    { id: 'img3', src: 'https://cdn.popmart.com/media/catalog/product/cache/e4f266b495239b3722f109e5fd58f1d0/_/7/_750-750_3_157.jpg', alt: 'Lulu the Lamb with accessories' },
    { id: 'img4', src: 'https://cdn.popmart.com/media/catalog/product/cache/e4f266b495239b3722f109e5fd58f1d0/_/7/_750-750_4_140.jpg', alt: 'Lulu the Lamb packaging' },
  ],
  shortDescription: "Lulu the Lamb loves to frolic in the Dreamy Meadow, her soft wool shimmering. She carries a tiny basket of wildflowers, always ready for a picnic.",
  fullDescription: "Part of the enchanting 'Dreamy Meadow' collection, Lulu the Lamb is a testament to whimsical artistry. Crafted with meticulous attention to detail, her plush fur is incredibly soft to the touch, and her vinyl face features hand-painted details that bring out her sweet, innocent expression. Lulu comes with her signature tiny woven basket, filled with miniature felt wildflowers, and wears a delicate lace-trimmed bonnet. She stands approximately 15cm tall and is perfect for collectors and imaginative play.",
  specifications: [
    { label: 'Material', value: 'High-quality Plush, Vinyl' },
    { label: 'Height', value: 'Approx. 15cm (6 inches)' },
    { label: 'Series', value: 'Dreamy Meadow Collection' },
    { label: 'Designer', value: 'Kasing Lung for POP MART' },
    { label: 'Articulation', value: 'Head, Arms (limited)' },
    { label: 'Packaging', value: 'Collector\'s Edition Window Box' },
  ],
  tags: ["New Arrival", "Best Seller", "Dreamy Meadow"],
  sku: 'LB-DMC-LULULAMB-001',
  availability: 'In Stock',
  averageRating: 4.8,
  reviewCount: 72,
};

// Simple Header Placeholder
const SiteHeader = () => (
  <header className="bg-pink-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
        Labubu Land
      </Link>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors flex items-center">
          <Home className="mr-1 h-4 w-4" /> Home
        </Link>
        <Link to="/product-listing" className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors flex items-center">
          <Shirt className="mr-1 h-4 w-4" /> All Dolls
        </Link>
        <Link to="/cart" className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors flex items-center">
          <ShoppingCart className="mr-1 h-4 w-4" /> Cart
        </Link>
      </nav>
    </div>
  </header>
);

// Simple Footer Placeholder
const SiteFooter = () => (
  <footer className="bg-pink-50 border-t border-pink-200 py-8 mt-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
      <p className="text-sm">&copy; {new Date().getFullYear()} Labubu Land. All rights reserved.</p>
      <p className="text-xs mt-1">Where dreams and fluffiness meet!</p>
    </div>
  </footer>
);


const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('slug'); // Example: could be used to fetch product data

  // For this example, we use placeholder data. In a real app, you'd fetch based on productSlug.
  const product = placeholderProduct;

  useEffect(() => {
    console.log('ProductDetailPage loaded');
    if (productSlug) {
      console.log(`Product slug from URL: ${productSlug}`);
      // Here you would typically fetch product data using the slug
    }
  }, [productSlug]);

  const handleAddToCart = () => {
    console.log(`Adding product ${product.id} (${product.name}) to cart.`);
    sonnerToast.success(`${product.name} added to your cart!`, {
      description: "You can continue shopping or view your cart.",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = '/cart', // Simple navigation for example
      },
    });
  };

  const handleAddToWishlist = () => {
    console.log(`Adding product ${product.id} (${product.name}) to wishlist.`);
    sonnerToast.info(`${product.name} added to your wishlist!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <SiteHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/product-listing">Labubu Dolls</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery Section */}
          <section aria-labelledby="product-gallery-heading">
             <h2 id="product-gallery-heading" className="sr-only">Product Images</h2>
            <ProductGallery images={product.images} productName={product.name} />
          </section>

          {/* Product Information Section */}
          <section aria-labelledby="product-information-heading" className="space-y-6">
            <h1 id="product-information-heading" className="text-3xl lg:text-4xl font-bold text-purple-700">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
              {product.tags.map(tag => (
                <Badge key={tag} variant={tag === "New Arrival" ? "default" : "secondary"} className={tag === "New Arrival" ? "bg-pink-500 text-white" : "bg-purple-100 text-purple-700"}>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(product.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-3xl font-semibold text-pink-600">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" onClick={handleAddToWishlist} className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Availability:</strong> <span className={product.availability === "In Stock" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{product.availability}</span></p>
            </div>

            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium hover:text-pink-600">
                  <ToyBrick className="mr-2 h-5 w-5 text-purple-500" /> Full Description
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 prose prose-sm max-w-none">
                  {product.fullDescription}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium hover:text-pink-600">
                  <Package className="mr-2 h-5 w-5 text-purple-500" /> Specifications
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {product.specifications.map(spec => (
                      <li key={spec.label}><strong>{spec.label}:</strong> {spec.value}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium hover:text-pink-600">
                  <RotateCcw className="mr-2 h-5 w-5 text-purple-500" /> Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-2">
                  <p>Standard shipping: 5-7 business days.</p>
                  <p>Express shipping: 2-3 business days.</p>
                  <p>We offer a 30-day return policy for unopened items. Visit our <Link to="/returns-policy" className="text-pink-600 hover:underline">Returns Policy</Link> page for more details.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* Placeholder for Related Products Section */}
        <section aria-labelledby="related-products-heading" className="mt-12 pt-8 border-t border-pink-200">
          <h2 id="related-products-heading" className="text-2xl font-bold text-purple-700 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example Related Product Card (placeholder) */}
            {[1,2,3,4].map(i => (
                 <Card key={i} className="overflow-hidden rounded-xl shadow-lg bg-white border border-pink-200/50">
                    <img src={`https://images.unsplash.com/photo-1587044589492-ae059c63099d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZSUyMGRvbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60&h=300`} alt={`Related Labubu Doll ${i}`} className="w-full h-48 object-cover" />
                    <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-purple-600 mb-1">Another Cute Labubu</h3>
                        <p className="text-pink-500 font-bold">$49.99</p>
                        <Button variant="outline" size="sm" className="mt-3 w-full border-purple-500 text-purple-500 hover:bg-purple-50 hover:text-purple-600" asChild>
                            <Link to={`/product-detail?slug=related-doll-${i}`}>View Details</Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
        </section>

        {/* Placeholder for Customer Reviews Section */}
        <section aria-labelledby="customer-reviews-heading" className="mt-12 pt-8 border-t border-pink-200">
          <h2 id="customer-reviews-heading" className="text-2xl font-bold text-purple-700 mb-6">Customer Reviews</h2>
          <Card className="bg-white p-6 shadow-md border border-pink-200/50">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl text-purple-600">What Our Customers Say</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600">No reviews yet for this product. Be the first to write one!</p>
              {/* Future: Add review list and form */}
              <Button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white">Write a Review</Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ProductDetailPage;