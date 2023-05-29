import { AppProps } from 'next/app';
import { CartProvider } from '../contexts/CartContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default App;
