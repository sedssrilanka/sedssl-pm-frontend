import type { Metadata } from 'next';
import { Roboto, JetBrains_Mono } from '@next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

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
    <html lang="en">
      <body className={`${roboto.variable} ${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
