"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
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
  posts: ContentItem;
  getImageUrl: (image: string | null) => string;
}

export default function ContentsDetailsCarousel({ posts, getImageUrl }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api]);

  const imageUrls = (() => {
    const urls: string[] = [];
    if (posts.image1) urls.push(getImageUrl(posts.image1));
    if (posts.image2) {
      try {
        const parsed = JSON.parse(posts.image2);
        if (Array.isArray(parsed)) urls.push(...parsed.map(getImageUrl));
      } catch (e) {
        console.error("Invalid JSON in image2", e);
      }
    }
    return urls.length ? urls : ["/fallback-image.jpg"];
  })();

  return (
    <div className="w-full">
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={`${posts.id}-${index}`}>
                <Image
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={600}
                  className="w-full h-[400px] md:h-[550px] lg:h-[680px] object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/fallback-image.jpg";
                  }}
                />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
