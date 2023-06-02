import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Retrieves the initial props of the document
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* The head section of the document */}
        </Head>
        <body>
          {/* The main content of the document */}
          <Main />
          {/* The next script section of the document */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
