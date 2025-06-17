import React from 'react';
import TagContainer from './_components/TagContainer';

interface PageParams {
  params: {
    categoryId: string;
    subcategoryId: string;
    id: string;
    tag: string;
  };
}

function Page({ params }: PageParams) {
  if (!params.categoryId || !params.subcategoryId || !params.id || !params.tag) {
    return <div>Error: Missing required parameters</div>;
  }

  return (
    <div>
      <TagContainer
        categoryId={params.categoryId}
        subcategoryId={params.subcategoryId}
        id={params.id}
        tag={params.tag}
      />
    </div>
  );
}

export default Page;