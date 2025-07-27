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
  image2?: string | null; // Expecting a JSON string
  altText?: string;
  advertisingLink?: string | null; // New fields from provided data
  advertising_image?: string | null;
  author?: string;
  body1?: string;
  category_name?: string;
  date?: string;
  image2_url?: string[]; // Unused but included for type safety
  imageLink?: string | null;
  status?: string;
  sub_category_name?: string;
  sub_heading?: string;
  tags?: string[];
}

interface ImageCarouselProps {
  posts?: ContentItem;
  getImageUrl: (image: string | null) => string;
}

export default function CategorySubCategoryCarousel({ posts, getImageUrl }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Compute image URLs before useEffect
  const imageUrls: string[] = (() => {
    if (!posts || (!posts.image1 && !posts.image2)) {
      console.log("No images provided, using fallback");
      return ["/fallback-image.jpg"];
    }

    const urls: string[] = [];
    if (posts.image1) {
      const image1Url = getImageUrl(posts.image1);
      console.log("Adding image1:", image1Url);
      urls.push(image1Url);
    }
    if (posts.image2 && typeof posts.image2 === "string") {
      try {
        const parsed = JSON.parse(posts.image2);
        if (Array.isArray(parsed) && parsed.every((url) => typeof url === "string")) {
          const parsedUrls = parsed.map(getImageUrl);
          console.log("Adding image2 URLs:", parsedUrls);
          urls.push(...parsedUrls);
        } else {
          console.error("image2 is not an array of strings:", parsed);
        }
      } catch (e) {
        console.error("Invalid JSON in image2:", e);
      }
    } else {
      console.log("image2 is not a string or is missing:", posts?.image2);
    }
    return urls.length > 0 ? urls : ["/fallback-image.jpg"];
  })();

  // Auto-scroll only if multiple images are available
  useEffect(() => {
    if (!api || imageUrls.length <= 1) {
      console.log("Auto-scroll disabled: api=", !!api, "imageUrls.length=", imageUrls.length);
      return;
    }
    console.log("Starting auto-scroll with", imageUrls.length, "images");
    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api, imageUrls.length]);

  // Generate descriptive alt text
  const getAltText = (index: number) =>
    posts?.altText
      ? `${posts.altText} - Slide ${index + 1}`
      : `${posts?.heading || posts?.sub_heading || "Post"} - Slide ${index + 1} in ${posts?.category_name || "category"} ${posts?.sub_category_name || ""}`;

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
        aria-label={`Images for ${posts?.heading || posts?.sub_heading || "category post"}`}
      >
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={`carousel-image-${index}`}>
              {posts ? (
                <Link href={`/${posts.category_id}/${posts.subcategory_id}/${posts.id}`}>
                  <Image
                    src={imageUrl}
                    alt={getAltText(index)}
                    width={1200}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-[400px] md:h-[550px] lg:h-[680px] object-cover object-top"
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src.includes("fallback-image.jpg")) {
                        console.error("Fallback image failed to load:", target.src);
                        return;
                      }
                      console.log("Image failed to load, switching to fallback:", imageUrl);
                      target.src = "/fallback-image.jpg";
                      target.alt = `Fallback image for ${posts.heading || posts.sub_heading || "post"} - Slide ${index + 1}`;
                    }}
                    priority={index === 0}
                  />
                </Link>
              ) : (
                <Image
                  src={imageUrl}
                  alt={`Fallback Slide ${index + 1}`}
                  width={1200}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-[400px] md:h-[550px] lg:h-[680px] object-cover object-top"
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src.includes("fallback-image.jpg")) {
                      console.error("Fallback image failed to load:", target.src);
                      return;
                    }
                    console.log("Fallback image failed, switching to default:", imageUrl);
                    target.src = "/fallback-image.jpg";
                    target.alt = `Fallback image for slide ${index + 1}`;
                  }}
                  priority={index === 0}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}