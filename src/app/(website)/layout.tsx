import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import React from 'react';
import "@/app/globals.css"
import AppProvider from '@/components/provider/AppProvider';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppProvider>
      <Navbar />
      {children}
      <Footer />
      </AppProvider>
    </div>
  );
};

export default MainLayout;
