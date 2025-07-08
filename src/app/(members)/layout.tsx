import type { Metadata } from 'next';

import { SiteHeader } from '@/components/members/site-header';

export const metadata: Metadata = {
  title: 'SEDS SL',
  description: 'SEDS SL - Project Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
