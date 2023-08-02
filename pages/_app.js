import { CartContextProvider } from "@/components/CartContext";
import { mainBackground } from "@/lib/colors";
import { createGlobalStyle } from "styled-components"
import { SessionProvider } from "next-auth/react"
import Head from "next/head";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    min-height: 100vh;
    background: ${mainBackground};
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    
    & div[id="__next"]{
      /* height: 100vh; */
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      /* grid-template-rows: max-content 1fr max-content; */
      & main {
        flex: 1 0 auto;
        padding: 0 20px;
      }
    }
  }
`;

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return (
  <>
    <GlobalStyles/>
    <Head>
      <title>Vushivka shop</title>
      <link rel="icon" href="/icon.svg" sizes="any" />
    </Head>
    <SessionProvider session={session}>
      <CartContextProvider>
        <Component {...pageProps} /> 
      </CartContextProvider>
    </SessionProvider>
  </>)
}
