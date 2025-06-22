import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

const DashboardOverviewContainer = () => {

    const overviewData = [
        {
            id: 1,
            name : "Total Revenue",
            value : "132,570",
            icon : "/assets/images/business.png"
        },
        {
            id: 2,
            name : "Total Articles",
            value : "132,570",
            icon : "/assets/images/business.png"
        },
        {
            id: 3,
            name : "Pending Approvals",
            value : "132,570",
            icon : "/assets/images/business.png"
        },
        {
            id: 4,
            name : "Total Author",
            value : "132,570",
            icon : "/assets/images/business.png"
        },
        {
            id: 5,
            name : "Total User",
            value : "132,570",
            icon : "/assets/images/business.png"
        },
        {
            id: 6,
            name : "Subscribers",
            value : "132,570",
            icon : "/assets/images/business.png"
        },
    ]
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%] tracking-[0%] font-manrope">
          Dashboard Overview
        </h2>
        <p className="text-base font-medium text-[#929292] leading-[120%] tracking-[0%] font-manrope pt-[14px]">
          Dashboard
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            overviewData?.map((overview)=>{
                return <div key={overview.id} className="flex items-center justify-between bg-white rounded-[6px] shadow-md p-8">
                    <div>
                        <h3 className="text-xl font-bold text-[#131313] leading-[120%] tracking-[0%] font-manrope">{overview.name}</h3>
                        <p className="flex items-center gap-1 text-lg font-medium text-[#424242] leading-[120%] tracking-[0%] font-manrope pt-2"><Dot className="text-red-500 w-5 h-5" /> {overview?.value}</p>
                    </div>
                    <div>
                        <Image src={overview.icon} alt="overview icon" width={54} height={54}/>
                    </div>
                </div>
            })
        }
      </div>
    </div>
  );
};

export default DashboardOverviewContainer;
