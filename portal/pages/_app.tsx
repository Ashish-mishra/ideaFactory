import React from 'react';
import type { AppProps } from 'next/app';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
