import Head from 'next/head';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>AVON TRAVELS-Creating Trust Globally</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
