import type { Metadata } from 'next';
import ConstantsManager from '../lib/ConstantsManager';
import 'normalize.css';
import '@/styles/global.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Floating from '../components/Floating/Floating';

// TODO: メタデータ変更
export const metadata: Metadata = {
  title: ConstantsManager.get('head-title'),
  description: ConstantsManager.get('head-description'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body>
        <Header />
        {children}
        <Footer />
        <Floating />
      </body>
    </html>
  );
}
