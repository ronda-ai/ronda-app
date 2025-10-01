import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ronda AI',
  description: 'A fun way to encourage classroom participation.',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
