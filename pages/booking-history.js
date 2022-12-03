import { unstable_getServerSession } from 'next-auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import BookingListing from '../src/components/BookingListing';
import FlightListing from '../src/components/FlightListing';
import SearchFlights from '../src/components/inputs/searchFlights';
import Spinner from '../src/components/spinner';
import styles from '../styles/Home.module.css';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps({ req, res }) {
  // Fetch data from external API
  const session = await unstable_getServerSession(req, res, authOptions);
  let bookings = {};
  let id = null;
  console.log('session shivam session shshshshshs', session);
  if (session) {
    id = `${session.user.userType === 'Agent' ? 'idagent' : 'idstaff'}=${session.user.userId}`;
    const response = await fetch(`${process.env.BASE_URL}/api/fetch-bookings?${id}&skip=0`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    bookings = await response.json();
  }
  // Pass data to the page via props
  return { props: { bookings, id } };
}

export default function BookingHistory({ id, bookings }) {
  const [data, setData] = useState({
    flightBooked: bookings.flightBooked || [],
    totalCount: bookings.totalCount || 0,
    fetched: true,
  });
  const [logos, setLogos] = useState({ ...bookings.logos });
  const [loading, setLoading] = useState(false);
  console.log(bookings, id);
  const callDataRef = useRef();
  const fetchData = async (skip) => {
    setLoading(true);
    if (!skip) setData({ fetched: false });
    const response = await fetch(`/api/fetch-bookings?${id}&skip=${skip}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const bookings = await response.json();
    console.log(data);
    setLoading(false);
    setData((prev) => ({
      flightBooked: [...prev.flightBooked, ...bookings.flightBooked],
      totalCount: bookings.totalCount,
      fetched: true,
    }));
    setLogos((prev) => ({ ...prev, ...bookings.logos }));
  };

  const observer = useRef(); // (*)
  const lastBookElementRef = useCallback(
    // (*)
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.flightBooked.length < data.totalCount) {
          fetchData(data.flightBooked.length);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className={styles.container}>
      <main className={`${styles.main} justify-start pt-24 lg:pt-28 `}>
        <div className='w-full flex justify-center  my-10'>
          {loading && !data.fetched ? (
            <Spinner />
          ) : data.fetched ? (
            data.totalCount ? (
              <div className='show-history flex flex-col w-full md:max-w-3xl lg:max-w-5xl px-4 lg:px-0'>
                <div className='w-full flex justify-between items-start'>
                  <section className='flex flex-col items-start'>
                    <span className='text-base lg:text-lg font-bold'>Booking History</span>
                  </section>
                  <span className='text-xs md:text-sm mt-2'>Bookings found: {data.totalCount}</span>
                </div>
                {data?.flightBooked?.map((flight, i) => (
                  <BookingListing
                    key={flight.idbooknow}
                    {...flight}
                    logo={logos[flight.inventory.flightcompany]}
                    {...(data.flightBooked.length === i + 1 ? { paginationref: lastBookElementRef } : {})}
                  />
                ))}
                {loading && <Spinner />}
              </div>
            ) : (
              <p className='text-center'>No Data Found.</p>
            )
          ) : (
            <p className='text-center'>Search Flights Hernowowwowoe.</p>
          )}
        </div>
      </main>
    </div>
  );
}

BookingHistory.auth = true;
