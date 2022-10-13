import Layout from '../src/components/layout';
import '../styles/globals.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
  
export default MyApp;
