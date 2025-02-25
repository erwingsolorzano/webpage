import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const isProd = process.env.NODE_ENV === "production"
const basePath = isProd ? "/webpage" : ""
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Erwing Solorzano - FullStack Developer',
  description: 'Website personal de Erwing Solorzano',
  icons: {
    icon: `${basePath}/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}