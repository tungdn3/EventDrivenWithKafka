//import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect } from 'react'
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import Head from 'next/head'
import Navbar from '../components/Navbar';
import { Container } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <>
      <Head>
        <title>Sweet Teeth</title>
        <meta name="description" content="Sweetie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShoppingCartProvider>
        <Navbar></Navbar>
        <Container>
          <Component {...pageProps} />
          <footer className="mt-5 text-center">
            Copyright &copy; SweetTeeth All Rights Reserved
          </footer>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default MyApp
