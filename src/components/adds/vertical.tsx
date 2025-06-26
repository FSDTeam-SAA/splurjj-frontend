"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
        toast.error(error instanceof Error ? error.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdData();
  }, []);

  console.log(loading)

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='w-full h-[300px]'>
      {adData?.code ? (
        <div dangerouslySetInnerHTML={{ __html: adData.code }} />
      ) : adData?.image && adData?.link ? (
        <a href={adData.link} target="_blank" rel="noopener noreferrer">
          <Image src={adData.image} alt="Advertisement" style={{ maxWidth: '100%' }}  className='w-full h-[300px]' width={2600} height={300}/>
        </a>
      ) : (
        <div>No advertisement available</div>
      )}
    </div>
  );
}

export default Vertical;