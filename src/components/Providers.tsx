import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HeroUIProvider } from '@/components/ui/heroui';
import React, { ReactNode } from 'react';
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastContainer position='bottom-right' hideProgressBar />
      {children}
    </HeroUIProvider>
  );
}
