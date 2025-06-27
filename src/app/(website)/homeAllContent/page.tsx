import React from "react";
import Contents from "./_components/contents";
import Horizontal from "@/components/adds/horizontal";

function page() {
  return (
    <div className="container">
        <div className="text-center pt-16">
            <h1 className="text-[60px] font-bold ">All Contents</h1>
            <p className="max-w-[800px] mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud e</p>
        </div>
      <div className="grid grid-cols-8 gap-4 pt-16">
        {/* Main content */}
        <div className="col-span-8 md:col-span-6 pb-16">
          <Contents />
        </div>

        {/* Sticky sidebar */}
        <div className="col-span-8 md:col-span-2">
          <div className="sticky top-[120px] mb-2">
            <Horizontal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
