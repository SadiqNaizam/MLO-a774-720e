import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ShoppingCart, User, Heart, Instagram, Twitter, Facebook, ChevronRight } from 'lucide-react';

// Custom Components
import HeroSectionBanner, { HeroBannerItem } from '@/components/HeroSectionBanner';
import LabubuProductCard from '@/components/LabubuProductCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Badge } from '@/components/ui/badge'; // For cart count

// Placeholder data for HeroSectionBanner
const heroBannerItems: HeroBannerItem[] = [
  {
    id: 'banner1',
    imageUrl: 'https://images.unsplash.com/photo-1546707540-92c8b357287c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80&h=600', // Playful, dreamy background
    altText: 'Labubu Dreamy Meadow Collection',
    title: 'Explore the Dreamy Meadow!',
    subtitle: 'New enchanting Labubu friends have just arrived. Find your favorite magical companion today!',
    ctaText: 'Discover Collection',
    ctaLink: '/product-listing', // Path from App.tsx
    textPosition: 'left',
    textColor: 'text-white',
    overlayStyle: 'gradient-right'
  },
  {
    id: 'banner2',
    imageUrl: 'https://images.unsplash.com/photo-1517299354407-73563a189a5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80&h=600', // Cute dolls theme
    altText: 'Labubu Limited Edition Sparkle Series',
    title: 'Limited Edition Sparkle Series!',
    subtitle: 'Don\'t miss out on these rare and dazzling Labubus. Collect them all before they\'re gone!',
    ctaText: 'Shop Limited Editions',
    ctaLink: '/product-listing?series=sparkle', // Example of using query params
    textPosition: 'center',
    textColor: 'text-pink-100',
    overlayStyle: 'darken'
  },
];

// Placeholder data for LabubuProductCard
const featuredProducts = [
  { id: 'labubu001', name: 'Luna the Forest Sprite', price: 32.99, imageUrl: 'https://placehold.co/400x400/E9D5FF/4C1D95?text=Luna+Sprite', slug: 'luna-forest-sprite' },
  { id: 'labubu002', name: 'Cosmo the Star Gazer', price: 29.50, imageUrl: 'https://placehold.co/400x400/FECDD3/86198F?text=Cosmo+Star', slug: 'cosmo-star-gazer' },
  { id: 'labubu003', name: 'Pip the Berry Picker', price: 35.00, imageUrl: 'https://placehold.co/400x400/D1FAE5/831843?text=Pip+Berry', slug: 'pip-berry-picker' },
  { id: 'labubu004', name: 'Sunny the Meadow Dancer', price: 28.75, imageUrl: 'https://placehold.co/400x400/FEF9C3/701A75?text=Sunny+Dancer', slug: 'sunny-meadow-dancer' },
];

// Inline SiteHeader component
const SiteHeader: React.FC = () => {
  // Placeholder for cart item count
  const cartItemCount = 0; // In a real app, this would come from state

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-200/70 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2 group">
          <Store className="h-8 w-8 text-pink-500 group-hover:text-purple-600 transition-colors" />
          <span className="text-2xl font-bold text-purple-700 group-hover:text-pink-600 transition-colors">Labubu Land</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/product-listing">
                <NavigationMenuLink className={navigationMenuTriggerStyle() + " hover:text-pink-600"}>
                  Shop All
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/product-listing?category=new-arrivals">
                <NavigationMenuLink className={navigationMenuTriggerStyle() + " hover:text-pink-600"}>
                  New Arrivals
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/product-listing?category=collections">
                <NavigationMenuLink className={navigationMenuTriggerStyle() + " hover:text-pink-600"}>
                  Collections
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-pink-100 transition-colors group">
            <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-pink-600" />
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-pink-500 text-white">
                {cartItemCount}
              </Badge>
            )}
             <span className="sr-only">View Cart</span>
          </Link>
          <Link to="/login" className="p-2 rounded-full hover:bg-pink-100 transition-colors group md:hidden"> {/* Example login/user link, adjust path as needed */}
             <User className="h-6 w-6 text-gray-600 group-hover:text-pink-600" />
             <span className="sr-only">My Account</span>
          </Link>
           {/* Mobile Menu Trigger - can be implemented with a Sheet or DropdownMenu */}
           <Button variant="ghost" size="icon" className="md:hidden hover:bg-pink-100 group">
            <Heart className="h-6 w-6 text-gray-600 group-hover:text-pink-600" /> {/* Placeholder for menu icon */}
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

// Inline SiteFooter component
const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-purple-700 text-pink-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Labubu Land</h3>
            <p className="text-sm text-pink-200">Bringing joy with every whimsical doll.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-pink-300 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-pink-300 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-pink-300 transition-colors">FAQ</Link></li>
              <li><Link to="/product-listing" className="hover:text-pink-300 transition-colors">Shop All</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-200 hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-pink-200 hover:text-white transition-colors"><Twitter size={24} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-pink-200 hover:text-white transition-colors"><Facebook size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-purple-600 pt-8 text-center text-sm text-pink-200">
          &copy; {new Date().getFullYear()} Labubu Land. All Rights Reserved. Designed with <Heart className="inline h-4 w-4 text-pink-400" />.
        </div>
      </div>
    </footer>
  );
};


const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 font-sans selection:bg-pink-300 selection:text-pink-800">
      <SiteHeader />
      <ScrollArea className="flex-1">
        <main>
          <HeroSectionBanner items={heroBannerItems} />

          <section id="featured-products" className="py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-10 sm:mb-12 drop-shadow-sm">
                Meet Our Magical Labubus
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map(product => (
                  <LabubuProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    slug={product.slug}
                  />
                ))}
              </div>
              <div className="text-center mt-12 sm:mt-16">
                <Button
                  asChild
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 group shadow-md hover:shadow-lg focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                >
                  <Link to="/product-listing">
                    Shop All Labubus
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* You can add more sections here, e.g., "New Arrivals", "Shop by Category", "Testimonials" */}
          <section className="py-12 md:py-16 lg:py-20 bg-white/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-6">Join the Labubu Family!</h2>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    Subscribe to our newsletter for exclusive updates, new arrivals, and special discounts.
                </p>
                <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-grow p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-shadow"
                        aria-label="Email for newsletter"
                    />
                    <Button 
                        type="submit"
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
                    >
                        Subscribe
                    </Button>
                </form>
            </div>
          </section>

        </main>
      </ScrollArea>
      <SiteFooter />
    </div>
  );
};

export default Homepage;