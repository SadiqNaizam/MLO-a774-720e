import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import LabubuProductCard from '@/components/LabubuProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Filter, ShoppingCart, Search, PackageOpen } from 'lucide-react';

// Define a simple SiteHeader component for navigation
const SiteHeader: React.FC = () => {
  console.log('SiteHeader loaded for ProductListingPage');
  // Example cart item count - in a real app, this would come from state
  const cartItemCount = 0; 

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            Labubu World
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/product-listing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Shop All</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* Add more navigation items if needed, e.g., Collections, About Us */}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="View Cart" className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Define a simple SiteFooter component
const SiteFooter: React.FC = () => {
  console.log('SiteFooter loaded for ProductListingPage');
  return (
    <footer className="bg-purple-100 border-t border-purple-200 text-purple-700 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Labubu World. All rights reserved.</p>
        <p className="text-sm mt-1">Discover the magic of Labubu!</p>
      </div>
    </footer>
  );
};


interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  series: string;
  type: string;
  dateAdded: string; // ISO string for date
  popularityScore: number; // 0-100
}

const mockProducts: Product[] = [
  { id: '1', name: 'Labubu "Forest Fairy" Bloom', price: 15.99, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办05.jpg?v=1710499333&width=400', slug: 'labubu-forest-fairy-bloom', series: 'Forest Fairy', type: 'Blind Box', dateAdded: '2024-07-15T10:00:00Z', popularityScore: 85 },
  { id: '2', name: 'Labubu "Sweet Dreams" Kiki', price: 12.50, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办02.jpg?v=1710499333&width=400', slug: 'labubu-sweet-dreams-kiki', series: 'Sweet Dreams', type: 'Plush', dateAdded: '2024-07-20T10:00:00Z', popularityScore: 92 },
  { id: '3', name: 'Labubu "Cosmic Voyager" Astro', price: 18.00, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU太空奇遇系列大手办墩墩宇航员01.jpg?v=1710500416&width=400', slug: 'labubu-cosmic-voyager-astro', series: 'Cosmic Voyager', type: 'Special Edition', dateAdded: '2024-06-01T10:00:00Z', popularityScore: 78 },
  { id: '4', name: 'Labubu "Ocean Whisper" Coral', price: 14.00, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办04.jpg?v=1710499333&width=400', slug: 'labubu-ocean-whisper-coral', series: 'Ocean Whisper', type: 'Blind Box', dateAdded: '2024-07-01T10:00:00Z', popularityScore: 88 },
  { id: '5', name: 'Labubu "Mini Forest Sprite"', price: 9.99, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办01.jpg?v=1710499333&width=400', slug: 'labubu-mini-forest-sprite', series: 'Forest Fairy', type: 'Keychain', dateAdded: '2024-07-22T10:00:00Z', popularityScore: 95 },
  { id: '6', name: 'Labubu "Starry Night" Luna', price: 22.50, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU太空奇遇系列大手办闪耀星河01.jpg?v=1710500416&width=400', slug: 'labubu-starry-night-luna', series: 'Sweet Dreams', type: 'Plush', dateAdded: '2024-05-10T10:00:00Z', popularityScore: 70 },
  { id: '7', name: 'Labubu "Galaxy Explorer" Zip', price: 19.99, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU太空奇遇系列大手办毛绒公仔墩墩宇航员01.jpg?v=1710500416&width=400', slug: 'labubu-galaxy-explorer-zip', series: 'Cosmic Voyager', type: 'Special Edition', dateAdded: '2024-07-18T10:00:00Z', popularityScore: 82 },
  { id: '8', name: 'Labubu "Deep Sea" Bubbles', price: 13.00, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办03.jpg?v=1710499333&width=400', slug: 'labubu-deep-sea-bubbles', series: 'Ocean Whisper', type: 'Blind Box', dateAdded: '2024-06-25T10:00:00Z', popularityScore: 75 },
  { id: '9', name: 'Labubu "Woodland Wanderer"', price: 16.50, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办06.jpg?v=1710499333&width=400', slug: 'labubu-woodland-wanderer', series: 'Forest Fairy', type: 'Blind Box', dateAdded: '2024-07-25T10:00:00Z', popularityScore: 90 },
  { id: '10', name: 'Labubu "Cloud Hopper" Sky', price: 11.00, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办07.jpg?v=1710499333&width=400', slug: 'labubu-cloud-hopper-sky', series: 'Sweet Dreams', type: 'Keychain', dateAdded: '2024-07-05T10:00:00Z', popularityScore: 80 },
  { id: '11', name: 'Labubu "Planet Protector" Nova', price: 25.00, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU太空奇遇系列大手办UFO01.jpg?v=1710500416&width=400', slug: 'labubu-planet-protector-nova', series: 'Cosmic Voyager', type: 'Plush', dateAdded: '2024-04-15T10:00:00Z', popularityScore: 65 },
  { id: '12', name: 'Labubu "Reef Guardian" Finn', price: 17.00, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办08.jpg?v=1710499333&width=400', slug: 'labubu-reef-guardian-finn', series: 'Ocean Whisper', type: 'Special Edition', dateAdded: '2024-07-12T10:00:00Z', popularityScore: 86 },
  { id: '13', name: 'Labubu "Mushroom Friend" Moss', price: 10.50, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办09.jpg?v=1710499333&width=400', slug: 'labubu-mushroom-friend-moss', series: 'Forest Fairy', type: 'Keychain', dateAdded: '2024-08-01T10:00:00Z', popularityScore: 98 },
  { id: '14', name: 'Labubu "Pillow Pal" Fluff', price: 14.50, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU精灵天团系列大手办10.jpg?v=1710499333&width=400', slug: 'labubu-pillow-pal-fluff', series: 'Sweet Dreams', type: 'Blind Box', dateAdded: '2024-07-28T10:00:00Z', popularityScore: 89 },
  { id: '15', name: 'Labubu "Comet Rider" Bolt', price: 20.00, imageUrl: 'https://popmart.sg/cdn/shop/files/LABUBU太空奇遇系列大手办飞行器01.jpg?v=1710500416&width=400', slug: 'labubu-comet-rider-bolt', series: 'Cosmic Voyager', type: 'Blind Box', dateAdded: '2024-03-20T10:00:00Z', popularityScore: 60 },
];

const ITEMS_PER_PAGE = 8;
const ALL_SERIES = Array.from(new Set(mockProducts.map(p => p.series)));
const ALL_TYPES = Array.from(new Set(mockProducts.map(p => p.type)));

const ProductListingPage: React.FC = () => {
  console.log('ProductListingPage loaded');

  const [allProducts] = useState<Product[]>(mockProducts);
  const [activeFilters, setActiveFilters] = useState<{ series: string[]; type: string[] }>({ series: [], type: [] });
  const [tempFilters, setTempFilters] = useState<{ series: string[]; type: string[] }>({ series: [], type: [] });
  const [sortOption, setSortOption] = useState<string>('popularity-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];

    // Apply filters
    if (activeFilters.series.length > 0) {
      products = products.filter(p => activeFilters.series.includes(p.series));
    }
    if (activeFilters.type.length > 0) {
      products = products.filter(p => activeFilters.type.includes(p.type));
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date-desc': // Newest first
        products.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'popularity-desc': // Most popular
      default:
        products.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
    }
    return products;
  }, [allProducts, activeFilters, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters or sort change
  }, [activeFilters, sortOption]);
  
  useEffect(() => {
    // Sync tempFilters with activeFilters when drawer opens
    if (isDrawerOpen) {
      setTempFilters(JSON.parse(JSON.stringify(activeFilters)));
    }
  }, [isDrawerOpen, activeFilters]);

  const handleFilterChange = (filterCategory: 'series' | 'type', value: string, checked: boolean) => {
    setTempFilters(prev => {
      const currentCategoryFilters = prev[filterCategory];
      const newCategoryFilters = checked
        ? [...currentCategoryFilters, value]
        : currentCategoryFilters.filter(item => item !== value);
      return { ...prev, [filterCategory]: newCategoryFilters };
    });
  };

  const applyFilters = () => {
    setActiveFilters(tempFilters);
    setIsDrawerOpen(false);
  };

  const clearFilters = () => {
    setTempFilters({ series: [], type: [] });
    setActiveFilters({ series: [], type: [] }); // Also clear active filters immediately
    setIsDrawerOpen(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 font-sans antialiased">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-700 tracking-tight">Our Labubu Collection</h1>
          <p className="mt-2 text-lg text-pink-500">Find your new magical friend!</p>
        </div>

        {/* Controls: Filter Drawer Trigger and Sort Select */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-pink-200">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="border-pink-400 text-pink-600 hover:bg-pink-100 w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                { (activeFilters.series.length > 0 || activeFilters.type.length > 0) && 
                  <span className="ml-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">
                    {activeFilters.series.length + activeFilters.type.length}
                  </span>
                }
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
             <ScrollArea className="h-[calc(100vh-150px)] sm:h-auto sm:max-h-[80vh]">
              <DrawerHeader className="text-left">
                <DrawerTitle className="text-purple-700">Filter Labubus</DrawerTitle>
                <DrawerDescription className="text-gray-600">Select criteria to narrow down your search.</DrawerDescription>
              </DrawerHeader>
              
              <div className="p-4 space-y-6">
                {/* Series Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-700">Filter by Series</h3>
                  <div className="space-y-2">
                    {ALL_SERIES.map(series => (
                      <div key={series} className="flex items-center space-x-2">
                        <Checkbox
                          id={`series-${series}`}
                          checked={tempFilters.series.includes(series)}
                          onCheckedChange={(checked) => handleFilterChange('series', series, !!checked)}
                          className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                        />
                        <Label htmlFor={`series-${series}`} className="text-gray-600 cursor-pointer">{series}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-700">Filter by Type</h3>
                  <div className="space-y-2">
                    {ALL_TYPES.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={tempFilters.type.includes(type)}
                          onCheckedChange={(checked) => handleFilterChange('type', type, !!checked)}
                           className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                        />
                        <Label htmlFor={`type-${type}`} className="text-gray-600 cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </ScrollArea>
              <DrawerFooter className="border-t pt-4 flex-col sm:flex-row gap-2">
                <Button onClick={applyFilters} className="bg-pink-500 hover:bg-pink-600 text-white w-full sm:w-auto">Apply Filters</Button>
                <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">Clear All</Button>
                <DrawerClose asChild>
                  <Button variant="ghost" className="w-full sm:w-auto sm:hidden">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full text-gray-700 border-gray-300 hover:border-pink-400 focus:ring-pink-500">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity-desc">Sort by: Popularity</SelectItem>
                <SelectItem value="date-desc">Sort by: Newest</SelectItem>
                <SelectItem value="price-asc">Sort by: Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Sort by: Price (High to Low)</SelectItem>
                <SelectItem value="name-asc">Sort by: Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Sort by: Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {paginatedProducts.map(product => (
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
        ) : (
          <div className="text-center py-20">
            <PackageOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">No Labubus Found!</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters or check back later for new arrivals.</p>
            <Button onClick={clearFilters} variant="link" className="mt-4 text-pink-600">Clear all filters</Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Basic pagination display logic (could be more complex for many pages)
                  const showPageLink = 
                    totalPages <= 5 || // Show all if 5 or less pages
                    pageNum === 1 || pageNum === totalPages || // Always show first and last
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1); // Show current and adjacent
                  
                  const showEllipsis = 
                    totalPages > 5 &&
                    ((pageNum === currentPage - 2 && currentPage > 3) || 
                     (pageNum === currentPage + 2 && currentPage < totalPages - 2));

                  if (showEllipsis) {
                    return <PaginationEllipsis key={`ellipsis-${pageNum}`} />;
                  }

                  if (showPageLink) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                          isActive={currentPage === pageNum}
                          className={currentPage === pageNum ? "bg-pink-500 text-white hover:bg-pink-600 hover:text-white" : "hover:bg-pink-100"}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ProductListingPage;