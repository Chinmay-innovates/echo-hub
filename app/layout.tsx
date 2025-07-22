import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { SocketProvider } from '@/components/providers/socket-provider';

export const font = Rubik({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
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
            <SocketProvider>
              <ModalProvider />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
