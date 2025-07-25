import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from 'next/image';
import { CarouselApi } from "@/components/ui/carousel";
import Link from 'next/link';

interface ContentItem {
  id: number;
  category_id: number;
  subcategory_id: number;
  category_name?: string;
  sub_category_name?: string;
  heading: string;
  author: string;
  date: string;
  sub_heading: string;
  body1: string;
  image1: string | null;
  image2?: string | null;
  advertising_image: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  imageLink: string | null;
  advertisingLink: string | null;
  user_id: number;
  status: string;
}

interface ImageCarouselProps {
  posts: ContentItem[];
  getImageUrl: (image: string | null) => string;
}

export default function ImageCarousel({ posts, getImageUrl }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const getImageUrls = (post: ContentItem): string[] => {
    const urls: string[] = [];
    if (post.image1) {
      urls.push(getImageUrl(post.image1));
    }
    if (post.image2) {
      try {
        const images = JSON.parse(post.image2) as string[];
        urls.push(...images);
      } catch (e) {
        console.error('Failed to parse image2:', post.image2, e);
      }
    }
    return urls.length > 0 ? urls : ['/fallback-image.jpg'];
  };

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {posts && posts.length > 0 ? (
            posts.map((post) =>
              getImageUrls(post).map((imageUrl, index) => (
                <CarouselItem key={`${post.id}-${index}`}>
                  <div className="mt-8">
                    <Link
                      href={`/${post.category_id}/${post.subcategory_id}/${post.id}`}
                    >
                      <Image
                        src={imageUrl}
                        alt={`${post.heading} - Image ${index + 1}`}
                        width={1200}
                        height={600}
                        className="w-full h-[400px] md:h-[550px] lg:h-[680px] object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.src = '/fallback-image.jpg';
                        }}
                      />
                    </Link>
                  </div>
                </CarouselItem>
              ))
            )
          ) : (
            <CarouselItem>
              <div className="mt-8 text-center">
                <p>No posts available</p>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

