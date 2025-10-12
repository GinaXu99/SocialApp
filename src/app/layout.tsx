import type { Metadata } from 'next';
import './globals.css';
import Providers from '../components/Providers';
import TopNav from '../components/navbar/TopNav';

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
          <main className='container mx-auto'>{children}</main>{' '}
        </Providers>
      </body>
    </html>
  );
}
