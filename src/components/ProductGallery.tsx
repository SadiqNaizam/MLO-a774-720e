import React, { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Image {
  id: string | number; // For key prop
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: Image[];
  productName?: string; // Optional: for more descriptive alt text for accessibility
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName = "Product" }) => {
  console.log('ProductGallery loaded');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Reset selected index if images change and selectedIndex is out of bounds, or if no images
    if (!images || images.length === 0) {
        setSelectedIndex(0); // Or -1 if preferred for no selection state
    } else if (selectedIndex >= images.length) {
      setSelectedIndex(images.length - 1); // Select last image if current index is too high
    }
  }, [images, selectedIndex]);

  // Close zoom on Escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    if (isZoomed) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isZoomed]);


  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No images available for {productName}.</p>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const goToPrevious = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleZoom = () => {
    if (currentImage) {
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4" role="region" aria-label={`${productName} Image Gallery`}>
      {/* Main Image Display */}
      <div className="relative group">
        <AspectRatio ratio={1} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border">
          {currentImage ? (
            <img
              src={currentImage.src}
              alt={currentImage.alt || `${productName} - Image ${selectedIndex + 1}`}
              className="object-contain w-full h-full transition-opacity duration-300 ease-in-out cursor-pointer"
              onClick={toggleZoom}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-400 dark:text-gray-500">Image not found</p>
            </div>
          )}
        </AspectRatio>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleZoom}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/75 dark:text-white border-gray-300 dark:border-gray-600"
          aria-label="Zoom image"
          title="Zoom image"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/75 dark:text-white border-gray-300 dark:border-gray-600"
              aria-label="Previous image"
              title="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/75 dark:text-white border-gray-300 dark:border-gray-600"
              aria-label="Next image"
              title="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border dark:border-gray-700">
          <div className="flex space-x-2 p-2 bg-gray-50 dark:bg-gray-800/50">
            {images.map((image, index) => (
              <button
                key={image.id || index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all",
                  selectedIndex === index ? "border-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-background" : "border-gray-200 dark:border-gray-700 hover:border-primary/70"
                )}
                aria-label={`View image ${index + 1} of ${images.length}. ${image.alt || ""}`}
                aria-current={selectedIndex === index ? "true" : "false"}
              >
                <img
                  src={image.src}
                  alt={image.alt || `${productName} thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      {/* Zoomed Image Modal/Overlay */}
      {isZoomed && currentImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in-0"
          onClick={toggleZoom} // Click background to close
          role="dialog"
          aria-modal="true"
          aria-labelledby="zoomed-image-description"
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-90"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside image container
          >
            <img
              id="zoomed-image-description"
              src={currentImage.src}
              alt={`Zoomed: ${currentImage.alt || `${productName} - Image ${selectedIndex + 1}`}`}
              className="block object-contain w-auto h-auto max-w-[calc(90vw-40px)] max-h-[calc(90vh-40px)]" // Ensure padding for close button
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleZoom}
              className="absolute top-2 right-2 text-white bg-black/60 hover:bg-black/80 rounded-full dark:text-gray-300 dark:bg-white/20 dark:hover:bg-white/40"
              aria-label="Close zoom"
              title="Close zoom (Esc)"
            >
              <X className="h-6 w-6" />
            </Button>
             {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full dark:text-gray-300 dark:bg-white/20 dark:hover:bg-white/40"
                  aria-label="Previous image (Zoomed)"
                >
                  <ChevronLeft className="h-7 w-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full dark:text-gray-300 dark:bg-white/20 dark:hover:bg-white/40"
                  aria-label="Next image (Zoomed)"
                >
                  <ChevronRight className="h-7 w-7" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;