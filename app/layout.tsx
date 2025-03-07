import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatIA Template',
  description:
    'Template de chatbot versátil com Next.js e Shadcn UI. Respostas inteligentes e personalizáveis, usando Grog e Llama 3. Ideal para criar assistentes virtuais em diversas áreas. Facilita interações, com interface moderna e responsiva.',
  keywords: [
    'ChatIA Template',
    'IA',
    'Chat',
  ],
  authors: [{ name: 'Sua Empresa', url: 'https://www.suaempresa.com' }],
  openGraph: {
    title: 'ChatIA Template',
    description:
      'Template de chatbot versátil com Next.js e Shadcn UI. Respostas inteligentes e personalizáveis, usando Grog e Llama 3. Ideal para criar assistentes virtuais em diversas áreas. Facilita interações, com interface moderna e responsiva.',
    images: [
      {
        url: 'https://www.suaempresa.com/og-image.jpg', // Imagem para compartilhamento social
        width: 1200,
        height: 630,
        alt: 'ChatIA Template',
      },
    ],
  },
  icons: {
    icon: 'images/favicon-bid.png', // Ícone do site
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}