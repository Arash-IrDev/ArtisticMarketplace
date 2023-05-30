import { AppProps } from 'next/app';
import { CartProvider } from '../contexts/CartContext';
import { ProductProvider } from '../contexts/ProductContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
