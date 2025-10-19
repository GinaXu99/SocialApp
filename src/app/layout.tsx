import type { Metadata } from 'next';
import './globals.css';
import Providers from '../components/Providers';
import TopNav from '../components/navbar/TopNav';
import { Suspense } from 'react';
import LoadingComponent from '@/components/Loading';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Social App',
  description: 'Find your match',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id || null;
  const profileComplete = session?.user.profileComplete as boolean;

  return (
    <html lang='en'>
      <body>
        <Providers userId={userId} profileComplete={profileComplete}>
          <TopNav />
          <main className='container mx-auto'>
            <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
