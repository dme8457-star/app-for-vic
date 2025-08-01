import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-playfair',
});

export const metadata = {
  title: 'Tu Proyecto',
  description: 'Un viaje musical emocional',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-pink-200 text-black min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
