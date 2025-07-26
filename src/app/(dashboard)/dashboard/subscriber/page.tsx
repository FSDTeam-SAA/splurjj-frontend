import React from "react";
// import SubscriberContainer from "./_components/SubscriberContainer";
import SubscriberPage from "./_components/subscriber-container";
import SubscriberHeader from "./_components/subscriber-header";

const Page = () => {
  return (
    <div>
      <SubscriberHeader/>
      <SubscriberPage/>
      {/* <SubscriberContainer /> */}
    </div>
  );
};

export default Page;
