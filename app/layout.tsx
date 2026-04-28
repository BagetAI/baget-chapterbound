import './globals.css';
import type { Metadata } from 'next';
import { Lora, Montserrat } from 'next/font/google';

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ChapterBound | Neighborhood Book Clubs',
  description: 'The social heartbeat of your neighborhood bookshelf. Connect with local readers within a 2-mile radius.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${montserrat.variable}`}>
      <body className="bg-[#F4F1DE] text-[#293241] antialiased">
        {children}
      </body>
    </html>
  );
}
