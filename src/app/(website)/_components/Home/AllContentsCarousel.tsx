"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Share, Target, ChevronLeft, ChevronRight } from "lucide-react";

// Interface for ContentItem
interface ContentItem {
  id: number;
  category_id: number;
  subcategory_id: number;
  heading: string;
  author: string;
  date: string;
  sub_heading: string;
  body1: string;
  image1: string | null;
  advertising_image: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  imageLink: string | null;
  advertisingLink: string | null;
  user_id: number;
  status: string;
}

interface AllContentsCarouselProps {
  contents: ContentItem[];
  selectedIndex?: number;
}

function AllContentsCarousel({ contents = [], selectedIndex = 0 }: AllContentsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(contents.length / itemsPerSlide);

  useEffect(() => {
    if (!isAutoPlaying || contents.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, contents.length]);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < totalSlides) {
      setCurrentSlide(selectedIndex);
    }
  }, [selectedIndex, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Helper functions
  const parseTags = (tags: string[] | string): string[] => {
    if (Array.isArray(tags)) return tags;
    try {
      return JSON.parse(tags) || [];
    } catch {
      return [];
    }
  };

  const stripHtmlTags = (html: string): string => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const getTagColors = (tag: string): string => {
    const colors: Record<string, string> = {
      news: "bg-blue-600",
      sports: "bg-green-600",
      entertainment: "bg-purple-600",
      technology: "bg-indigo-600",
      default: "bg-primary",
    };
    return colors[tag.toLowerCase()] || colors.default;
  };

  const getImageUrl = (path: string | null): string => {
    if (!path) return "/assets/videos/blog1.jpg";
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  };

  if (contents.length === 0) {
    return (
      <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
        <div className="text-center text-gray-600">No active contents available.</div>
      </div>
    );
  }

  return (
    <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
      <div className="relative">
        {/* Carousel Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-manrope text-[#131313]">
            Latest Contents
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contents
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((item) => {
                      const tags = parseTags(item.tags);
                      const heading = stripHtmlTags(item.heading);
                      const subHeading = stripHtmlTags(item.sub_heading);
                      const body = stripHtmlTags(item.body1);

                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                          {/* Tags */}
                          <div className="absolute top-4 left-4 z-10 flex gap-1">
                            {tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className={`${getTagColors(tag)} text-white text-xs font-bold px-2 py-1 rounded uppercase`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Image */}
                          <div className="relative h-48 md:h-56">
                            <Image
                              src={getImageUrl(item.image1)}
                              alt={heading || "Content image"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <h3 className="text-lg font-bold font-manrope text-[#131313] mb-2 line-clamp-2">
                              {heading}
                            </h3>
                            <p className="text-sm text-[#424242] font-manrope mb-3 line-clamp-2">
                              {subHeading || body.substring(0, 100) + "..."}
                            </p>
                            <div className="flex justify-between items-center">
                              <p className="text-xs font-semibold font-manrope uppercase text-[#424242]">
                                {item.author} - {new Date(item.date).toLocaleDateString("en-GB")}
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  aria-label="Share content"
                                >
                                  <Share className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  aria-label="Target content"
                                >
                                  <Target className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  aria-label="Comment on content"
                                >
                                  <MessageCircle className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllContentsCarousel;