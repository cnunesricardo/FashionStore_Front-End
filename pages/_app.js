import { SessionProvider } from "next-auth/react";
import { CartProvider } from "/src/app/contexts/CartContext";
import { ThemeProvider } from "/src/app/contexts/ThemeContext";



function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider>
        <SessionProvider session={session}>
          <CartProvider>
          <Component {...pageProps} />
          </CartProvider>
        </SessionProvider>
     </ThemeProvider>
  );
}
export default App;