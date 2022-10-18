import Head from 'next/head';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>AVON TRAVELS-Creating Trust Globally</title>
        <script defer type='text/javascript' src='https://cdn.jsdelivr.net/jquery/latest/jquery.min.js'></script>
        <script defer type='text/javascript' src='https://cdn.jsdelivr.net/momentjs/latest/moment.min.js'></script>
        <script
          defer
          type='text/javascript'
          src='https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js'
        ></script>
        <link
          defer
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css'
        />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
