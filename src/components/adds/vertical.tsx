"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type AdData = {
  code?: string;
  image?: string;
  link?: string;
};

function Vertical() {
  const [adData, setAdData] = useState<AdData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/advertising/vertical`);
        const result = await response.json();
        if (result.success) {
          setAdData(result.data);
        } else {
          setError('Failed to fetch advertising data');
        }
      } catch (error) {
        // toast.error(error instanceof Error ? error.message : 'Error fetching data');
        console.log('Error fetching ad data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdData();
  }, []);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="animate-pulse w-full h-[300px]">
      <div className="bg-gray-300 w-full h-[300px] rounded-lg"></div>
    </div>
  );

  if (loading) return <SkeletonLoader />;
  if (error) return <div>{error}</div>;

  console.log("ads console",adData?.code)

  return (
    <div className=" h-[300px]">
      {adData?.code ? (
        <div dangerouslySetInnerHTML={{ __html: adData.code }} className="vertical-adds h-[300px]" />
      ) : adData?.image && adData?.link ? (
        <a href={adData.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={adData.image}
            alt="Advertisement"
            style={{ maxWidth: '100%' }}
            className="w-full h-[300px] object-cover rounded-lg"
            width={2600}
            height={300}
          />
        </a>
      ) : (
        <div>No advertisement available</div>
      )}
    </div>
  );
}

export default Vertical;