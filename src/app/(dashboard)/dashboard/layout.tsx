import React from 'react';
import "@/app/globals.css"
import DashboardHeader from './_components/dashboardHeader';
import Sidebar from './_components/sideber';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='h-screen w-full bg-cover bg-no-repeat bg-center bg-[url("/assets/images/bgDashboard.jpg")] overflow-hidden'>
            <div className='h-full flex flex-col'>
                <DashboardHeader />
                <div className='flex flex-1 overflow-hidden'>
                    <div className='w-64 min-w-[16rem]'>
                        <Sidebar />
                    </div>
                    <div className='flex-1 overflow-auto p-6 bg-[linear-gradient(to_right,_#FFFFFF,_#808080,_#C0C0C0,_#A9A9A9)]
'>
                        <main className='h-full'>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;