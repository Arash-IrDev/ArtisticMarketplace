import React from 'react';
import { AppProps } from 'next/app';
import { CartProvider } from '../contexts/CartContext';
import { ProductProvider } from '../contexts/ProductContext';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <CartProvider>
        <Head>
          {/* Sets the title of the webpage */}
          <title>Artistic Marketplace - Explore Unique Artworks</title>
          {/* Sets the meta description of the webpage */}
          <meta name="description" content="Artistic Marketplace is your destination for buying images and artworks from diverse categories. Explore our unique collection and add an artistic touch to your life." />
          {/* Sets the meta keywords of the webpage */}
          <meta name="keywords" content="Art, Images, Artworks, Buy Art, Online Art, Artistic Marketplace" />
          {/* Sets the viewport settings for mobile devices */}
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {/* Renders the component passed as a prop */}
        <Component {...pageProps} />
        {/* Renders the toast container for displaying notifications */}
        <ToastContainer />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
