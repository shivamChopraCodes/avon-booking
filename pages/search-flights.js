import { useCallback, useEffect, useRef, useState } from 'react';
import FlightListing from '../src/components/FlightListing';
import SearchFlights from '../src/components/inputs/searchFlights';
import Spinner from '../src/components/spinner';
import { useFiltersContext } from '../src/context/filtersContext';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.BASE_URL}/api/fetch-cities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const cities = await res.json();

  // Pass data to the page via props
  return { props: { cities } };
}

const FlightData = [
  {
    flightName: '6E-315',
    flightCompany: 'Thai Air',
    depart: '07:20',
    duration: '03h 15m',
    arrive: '08:20',
    price: '80,000',
    type: 'Non Stop',
    flightImg: '/images/thaiAir.jpeg',
  },
  {
    flightName: '6E-315',
    flightCompany: 'Vistara',
    depart: '07:20',
    duration: '03h 15m',
    arrive: '08:20',
    price: '80,000',
    type: 'Non Stop',
    flightImg: '/images/vistara.jpeg',
  },
  {
    flightName: '6E-315',
    flightCompany: 'Spicejet',
    depart: '07:20',
    duration: '03h 15m',
    arrive: '08:20',
    price: '80,000',
    type: 'Non Stop',
    flightImg: '/images/spicejet.jpeg',
  },
  {
    flightName: '6E-315',
    flightCompany: 'Air Asia',
    depart: '07:20',
    duration: '03h 15m',
    arrive: '08:20',
    price: '80,000',
    type: 'Non Stop',
    flightImg: '/images/airasia.jpeg',
  },
  {
    flightName: '6E-315',
    flightCompany: 'Indigo',
    depart: '07:20',
    duration: '03h 15m',
    arrive: '08:20',
    price: '80,000',
    type: 'Non Stop',
    flightImg: '/images/6E.jpeg',
  },
];

export default function SearchFlight({ cities }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    destination: '',
    origin: '',
    startDate: '',
    endDate: '',
  });
  const [filters, setFilters] = useFiltersContext();
  const callDataRef = useRef();
  const fetchData = async (callData, skip) => {
    if (!skip) callDataRef.current = { ...callData };
    const { startDate, endDate, destination, origin, type, occupants, showDates } = callData;
    setLoading(true);
    if (!skip) setData({ fetched: false });
    const response = await fetch(
      `/api/search-flight?startDate=${startDate}&endDate=${endDate}&departure=${origin}&arrival=${destination}&type=${type}&occupants=${occupants}${
        skip ? `&skip=${skip}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const tempData = await response.json();
    setLoading(false);
    setDetails({
      destination,
      origin,
      startDate: showDates[0],
      endDate: showDates[1],
    });
    const newFlights = [...(data?.flights || []), ...tempData.flights];
    setData({ ...tempData, flights: [...newFlights], fetched: true });
    setFilters((prev) => ({
      ...prev,
      data: {
        totalCount: tempData.totalCount,
        flights: [...newFlights],
        fetched: true,
      },
    }));
  };
  useEffect(() => {
    if (filters.data?.flights) {
      setData({ ...filters.data });
      setDetails({
        destination: filters.destination,
        origin: filters.origin,
        startDate: filters.showDates[0],
        endDate: filters.showDates[1],
      });
    }
  }, []);
  const observer = useRef(); // (*)
  const lastBookElementRef = useCallback(
    // (*)
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.flights.length < data.totalCount) {
          fetchData(callDataRef.current, data.flights.length);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, data]
  );

  return (
    <div className={styles.container}>
      <main className={`${styles.main} justify-start pt-32 lg:pt-40 `}>
        <SearchFlights cities={cities} submit={fetchData} />
        <div className='w-full flex flex-col items-center justify-center  my-10'>
          {loading && !data.fetched ? (
            <Spinner />
          ) : data.fetched ? (
            data.totalCount ? (
              <>
                <div className='mx-2 md:mx-auto mt-4 p-6 rounded-lg border-2 border-dotted border-primary-yellow bg-white w-full md:max-w-3xl lg:max-w-7xl flex items-center'>
                  <span className='text-xl font-bold mr-4'>Fare rules</span>
                  Tickets are Non changeable and Non refundable.
                </div>
                <div className='show-flights flex flex-col w-full md:max-w-3xl lg:max-w-7xl py-10 px-4 lg:px-0'>
                  <div className='w-full flex justify-between items-start'>
                    <section className='flex flex-col items-start'>
                      <span className='text-base lg:text-lg font-bold'>
                        {details.origin}
                        <strong className='text-xl'>→</strong> {details.destination}{' '}
                      </span>
                      <span className='text-sm lg:text-sm'>
                        {details.startDate} to {details.endDate}
                      </span>
                    </section>
                    <span className='text-xs md:text-sm mt-2'>Flights found: {data.totalCount}</span>
                  </div>
                  <div className='w-full hidden md:grid gap-4 lg:gap-10 overflow-hidden grid-cols-7 grid-rows-1 text-sm font-bold text-center my-4 lg:my-10 rounded bg-blue-100 py-2 bg-opacity-50'>
                    <p className='col-span-2'>Airline</p>
                    <p>Depart</p>
                    <p>Duration</p>
                    <p>Arrive</p>
                    <p className='col-span-2'>Price</p>
                  </div>
                  {data?.flights?.map((flight, i) => (
                    <FlightListing
                      key={flight.idinventory}
                      {...flight}
                      {...(data.flights.length === i + 1 ? { paginationref: lastBookElementRef } : {})}
                    />
                  ))}
                  {loading && <Spinner />}
                </div>
              </>
            ) : (
              <p className='text-center'>No Data Found.</p>
            )
          ) : (
            <p className='text-center'>Search Flights Here.</p>
          )}
        </div>
      </main>
    </div>
  );
}

SearchFlight.auth = true;
