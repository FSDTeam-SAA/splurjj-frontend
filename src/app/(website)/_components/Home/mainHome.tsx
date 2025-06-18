import React from "react";
import AllContents from "./AllContents";
import Adds from "./adds";
import ArtCulture from "./ArtCulture";

function MainHome() {
  return (
    <div>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-6">
          <AllContents />
        </div>
        <div className="col-span-2">
          <Adds />
        </div>
      </div>
      <Adds />
      <ArtCulture />
    </div>
  );
}

export default MainHome;
