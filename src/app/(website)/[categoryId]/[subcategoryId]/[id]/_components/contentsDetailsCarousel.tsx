"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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

export default function ContentsDetailsCarousel({
  posts,
  getImageUrl,
}: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, []);

  const imageUrls = (() => {
    const urls: string[] = [];
    if (posts.image1) urls.push(getImageUrl(posts.image1));
    if (posts.image2) {
      // First check if it's already an array
      if (Array.isArray(posts.image2)) {
        urls.push(...posts.image2.map(getImageUrl));
      } else if (typeof posts.image2 === "string") {
        try {
          const parsed = JSON.parse(posts.image2);
          if (Array.isArray(parsed)) {
            urls.push(...parsed.map(getImageUrl));
          } else if (typeof parsed === "string") {
            urls.push(getImageUrl(parsed));
          }
        } catch {
          // If JSON parsing fails, treat it as a regular string
          urls.push(getImageUrl(posts.image2));
        }
      }
    }
    return urls.length ? urls : ["/fallback-image.jpg"];
  })();

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={`${posts.id}-${index}`}>
              <Image
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                width={1200}
                height={600}
                className="aspect-[2/1] w-full object-top"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/fallback-image.jpg";
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
