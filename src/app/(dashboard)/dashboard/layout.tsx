import React from 'react';
import "@/app/globals.css"
import DashboardHeader from './_components/dashboardHeader';
import Sidebar from './_components/sideber';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='h-screen w-full bg-[#F9FAFB] dark:bg-black overflow-hidden'>
            <div className='h-full flex flex-col'>
                <DashboardHeader />
                <div className='flex flex-1 overflow-hidden'>
                    <div className='w-[300px] min-w-[16rem]'>
                        <Sidebar />
                    </div>
                    <div className='flex-1 overflow-auto p-6'>
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