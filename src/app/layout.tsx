import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://retard-santa-chaos.mobilefennel64.chatgpt.site'),
  title: 'Retard Santa | Christmas Just Got Chaotic',
  description: 'Meet Retard Santa, the chaotic Christmas meme on Solana. Wild eyes, maximum mustache, zero chill, and pure community chaos.',
  openGraph: { title: 'Retard Santa | Christmas Just Got Chaotic', description: 'Wild eyes. Maximum mustache. Zero chill.', images: ['/images/santa-rocket.jpg'] },
  twitter: { card: 'summary_large_image', images: ['/images/santa-rocket.jpg'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body><GoogleTagManager gtmId="GTM-52DTN2P9" /></html>; }
