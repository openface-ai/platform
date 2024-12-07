import { ReactNode } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Toast from '../ui/Toast';
import { UIProvider } from '@/app/context/UIContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <div className="min-h-screen bg-black text-gray-200 font-mono">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toast />
      </div>
    </UIProvider>
  );
}
