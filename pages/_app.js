import Layout from '../src/components/layout';
import '../styles/globals.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import Spinner from '../src/components/spinner';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { TravellersContextProvider } from '../src/context/travellerContext';
import { FlightsContextProvider } from '../src/context/flightContext';
import { FiltersContextProvider } from '../src/context/filtersContext';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  const homepageDataRef = useRef({});
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          <FiltersContextProvider>
            <FlightsContextProvider>
              <TravellersContextProvider>
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              </TravellersContextProvider>
            </FlightsContextProvider>
          </FiltersContextProvider>
        ) : (
          <Component {...pageProps} homepageDataRef={homepageDataRef} />
        )}
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return children;
}
