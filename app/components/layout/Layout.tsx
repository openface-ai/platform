import { ReactNode } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Toast from '../ui/Toast';
import { UIProvider } from '@/app/context/UIContext';
import { ThemeProvider } from '@/app/context/ThemeContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <UIProvider>
        <div className="min-h-screen bg-background text-foreground font-mono">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toast />
        </div>
      </UIProvider>
    </ThemeProvider>
  );
}
