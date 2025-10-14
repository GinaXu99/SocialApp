import type { Metadata } from 'next';
import './globals.css';
import Providers from '../components/Providers';
import TopNav from '../components/navbar/TopNav';
import { Suspense } from 'react';
import LoadingComponent from '@/components/Loading';

export const metadata: Metadata = {
  title: 'Social App',
  description: 'Find your match',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <TopNav />
          <main className='container mx-auto'>
            <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
