import type { Metadata } from 'next';
import ConstantsManager from '../lib/ConstantsManager';
import 'normalize.css';
import '@/styles/global.scss';
import styles from './layout.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Floating from '../components/Floating/Floating';
import { Alert } from '../components/Alert/Alert';

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
        <main className={styles.main}>
          <Alert />
          {children}
        </main>
        <Footer />
        <Floating />
      </body>
    </html>
  );
}
