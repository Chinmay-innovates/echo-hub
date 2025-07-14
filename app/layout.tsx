import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/modal-provider';

const font = Open_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Echohub',
  description:
    'A real-time chat platform for communities and friends. Voice, video, and text — all in one place. Create servers, join channels, and stay connected effortlessly.',
  icons: {
    icon: '/logo2.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'bg-white dark:bg-[#313338] antialiased',
            font.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="echohub-theme"
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
