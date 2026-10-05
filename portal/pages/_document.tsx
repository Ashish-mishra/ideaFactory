import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#fafaf8" />

        {/* Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Fonts — async to avoid render-blocking */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
          media="print"
          data-async-font=""
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.querySelectorAll('link[data-async-font]').forEach(function(l){l.onload=function(){l.media='all'};});`,
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </Head>
      <body className="bg-[#fafaf8] text-[#1a1710]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
