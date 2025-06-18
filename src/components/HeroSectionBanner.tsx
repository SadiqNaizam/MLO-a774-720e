import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronRight } from 'lucide-react';

// Define the props for each banner item
export interface HeroBannerItem {
  id: string | number;
  imageUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string; // e.g., "/product-listing"
  textPosition?: 'left' | 'center' | 'right';
  textColor?: string; // e.g., 'text-white'
  overlayStyle?: 'darken' | 'gradient-left' | 'gradient-right' | 'none'; // Simplified overlay control
}

// Define the props for the HeroSectionBanner component
export interface HeroSectionBannerProps {
  items: HeroBannerItem[];
}

const HeroSectionBanner: React.FC<HeroSectionBannerProps> = ({ items }) => {
  useEffect(() => {
    console.log('HeroSectionBanner loaded');
  }, []);

  if (!items || items.length === 0) {
    return <div className="text-center py-10 text-gray-500">No banner items to display.</div>;
  }

  const getOverlayClass = (style?: HeroBannerItem['overlayStyle'], position?: HeroBannerItem['textPosition']) => {
    switch (style) {
      case 'darken':
        return 'bg-black/40';
      case 'gradient-right': // Text on the left, gradient fades to right
        return 'bg-gradient-to-r from-black/60 via-black/30 to-transparent';
      case 'gradient-left': // Text on the right, gradient fades to left
        return 'bg-gradient-to-l from-black/60 via-black/30 to-transparent';
      case 'none':
        return '';
      default: // Default behavior: gradient based on text position, or darken if centered
        if (position === 'center') return 'bg-black/40';
        if (position === 'right') return 'bg-gradient-to-l from-black/60 via-black/30 to-transparent';
        return 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'; // Default to left-aligned text gradient
    }
  };

  return (
    <section className="w-full" aria-label="Promotional Banner">
      <Carousel
        opts={{
          loop: items.length > 1, // Loop only if multiple items
          align: "start",
        }}
        className="w-full relative group/carousel" // Added group for button visibility on hover
      >
        <CarouselContent className="-ml-0"> {/* Ensure no negative margin */}
          {items.map((item) => {
            const textAlignmentClass = 
              item.textPosition === 'center' ? 'justify-center items-center text-center' :
              item.textPosition === 'right' ? 'justify-center items-end text-right' :
              'justify-center items-start text-left'; // Default to left

            const overlayClass = getOverlayClass(item.overlayStyle, item.textPosition);
            
            return (
              <CarouselItem key={item.id} className="pl-0 basis-full"> {/* Each item takes full width */}
                <div className="relative w-full h-[60vh] md:h-[500px] lg:h-[600px] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover/carousel:scale-105"
                  />
                  <div
                    className={`absolute inset-0 flex flex-col p-6 sm:p-10 md:p-16 ${textAlignmentClass} ${overlayClass}`}
                  >
                    <div className={`max-w-sm md:max-w-md lg:max-w-lg ${item.textColor || 'text-white'}`}>
                      <h2 
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight drop-shadow-md"
                        // style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }} // Using drop-shadow utility
                      >
                        {item.title}
                      </h2>
                      {item.subtitle && (
                        <p 
                          className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 drop-shadow-sm"
                          // style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }} // Using drop-shadow utility
                        >
                          {item.subtitle}
                        </p>
                      )}
                      <Button 
                        asChild 
                        size="lg" 
                        className="bg-pink-500 hover:bg-pink-600 focus:ring-pink-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 group/button focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
                      >
                        <Link to={item.ctaLink}>
                          {item.ctaText}
                          <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {items.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-700 hover:text-pink-500 disabled:bg-white/40 disabled:text-gray-400 transition-opacity duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100" />
            <CarouselNext className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-700 hover:text-pink-500 disabled:bg-white/40 disabled:text-gray-400 transition-opacity duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100" />
          </>
        )}
      </Carousel>
    </section>
  );
};

export default HeroSectionBanner;