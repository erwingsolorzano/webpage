import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "sonner";

const isProd = process.env.NODE_ENV === "production"
const basePath = isProd ? "/webpage" : ""
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Erwing Solorzano - FullStack Developer',
  description: 'Experienced Full Stack Developer with over 3 years of expertise in web development, specializing in Node.js, React, and cloud technologies.',
  keywords: ['Full Stack Developer', 'Software Engineer', 'Web Development', 'Node.js', 'React', 'TypeScript', 'JavaScript'],
  authors: [{ name: 'Erwing Solorzano' }],
  openGraph: {
    title: 'Erwing Solorzano - FullStack Developer',
    description: 'Experienced Full Stack Developer specializing in modern web technologies',
    type: 'website',
    url: 'https://erwingsolorzano.github.io/webpage/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erwing Solorzano - FullStack Developer',
    description: 'Experienced Full Stack Developer specializing in modern web technologies',
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <head>
        <link rel="canonical" href="https://erwingsolorzano.github.io/webpage/" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}