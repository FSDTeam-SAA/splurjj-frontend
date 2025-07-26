"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import type { CarouselApi } from "@/components/ui/carousel";

interface ContentItem {
  id: number;
  category_id: number;
  subcategory_id: number;
  heading: string;
  image1: string | null;
  image2?: string | null;
}

interface ImageCarouselProps {
  posts?: ContentItem;
  getImageUrl: (image: string | null) => string;
}

export default function CategorySubCategoryCarousel({ posts, getImageUrl }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api]);

  const imageUrls = (() => {
    if (!posts || (!posts.image1 && !posts.image2)) {
      return ["/fallback-image.jpg"];
    }

    const urls: string[] = [];
    if (posts.image1) {
      urls.push(getImageUrl(posts.image1));
    }
    if (posts.image2) {
      try {
        const parsed = JSON.parse(posts.image2);
        if (Array.isArray(parsed)) {
          urls.push(...parsed.map(getImageUrl));
        }
      } catch (e) {
        console.error("Invalid JSON in image2:", e);
      }
    }
    return urls.length > 0 ? urls : ["/fallback-image.jpg"];
  })();

  

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
        aria-label="Category post images"
      >
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={`carousel-image-${index}`}>
              {posts ? (
                <Link href={`/${posts.category_id}/${posts.subcategory_id}/${posts.id}`}>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${posts.heading || "Post"} - Slide ${index + 1}`}
                      width={1200}
                      height={600}
                      className="w-full h-[400px] md:h-[550px] lg:h-[680px] object-cover object-top"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src.includes("fallback-image.jpg")) {
                          console.error("Fallback image failed to load:", target.src);
                          return;
                        }
                        target.src = "/fallback-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-[400px] md:h-[550px] lg:h-[680px] bg-gray-200 flex items-center justify-center">
                      <span>Image not available</span>
                    </div>
                  )}
                </Link>
              ) : (
                <Image
                  src={imageUrl}
                  alt={`Fallback Slide ${index + 1}`}
                  width={1200}
                  height={600}
                  className="w-full h-[400px] md:h-[550px] lg:h-[680px] object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src.includes("fallback-image.jpg")) {
                      console.error("Fallback image failed to load:", target.src);
                      return;
                    }
                    target.src = "/fallback-image.jpg";
                  }}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}