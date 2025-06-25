import React from "react";
import AllContents from "./AllContents";
import ArtCulture from "./ArtCulture";
import Gear from "./gear";
import Music from "./music";
import Ride from "./ride";
import Video from "./video";
import Horizontal from "@/components/adds/horizontal";
import Vertical from "@/components/adds/vertical";

function MainHome() {
  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-8 gap-4 pt-16">
          {/* Main content */}
          <div className="col-span-8 md:col-span-6 pb-16">
            <AllContents />
          </div>

          {/* Sticky sidebar */}
          <div className="col-span-8 md:col-span-2">
            <div className="sticky top-[120px] mb-2">
              <Horizontal />
            </div>
          </div>
        </div>
      </div>

      <Vertical />
      <div className="container">
        <div className="grid grid-cols-8 gap-4 pt-16">
          {/* Main content */}
          <div className="col-span-8 md:col-span-6 pb-16">
            <ArtCulture />
            <Gear />
          </div>

          {/* Sticky sidebar */}
          <div className="col-span-8 md:col-span-2">
            <div className="sticky top-[120px] mb-2">
              <Horizontal />
            </div>
          </div>
        </div>
      </div>
       <Vertical />
      <div className="container">
        <div className="grid grid-cols-8 gap-4 pt-16">
          {/* Main content */}
          <div className="col-span-8 md:col-span-6 pb-16">
            <Music />
            <Ride/> 
          </div>

          {/* Sticky sidebar */}
          <div className="col-span-8 md:col-span-2">
            <div className="sticky top-[120px] mb-2">
              <Horizontal />
            </div>
          </div>
        </div>
      </div>
       <Vertical />
      <div className="container">
        <div className="grid grid-cols-8 gap-4 pt-16">
          {/* Main content */}
          <div className="col-span-8 md:col-span-6 pb-16">
            <Video />
          </div>

          {/* Sticky sidebar */}
          <div className="col-span-8 md:col-span-2">
            <div className="sticky top-[120px] mb-2">
              <Horizontal />
            </div>
          </div>
        </div>
      </div>
       <Vertical />
    </div>
  );
}

export default MainHome;
