import { useEffect, useState } from 'react';
import FlightListing from '../src/components/FlightListing';
import SearchFlights from '../src/components/inputs/searchFlights';
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
  const fetchData = async () => {
    const response = await fetch('/api/search-flight', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    console.log(cities);
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <main className={`${styles.main} justify-start pt-18 lg:pt-32 `}>
        <SearchFlights cities={cities} />
        <div className='w-full flex justify-center  my-10'>
          <div className='show-flights flex flex-col w-full md:max-w-3xl lg:max-w-7xl py-10 px-4 lg:px-0'>
            <div className='w-full flex justify-between items-start'>
              <section className='flex flex-col items-start'>
                <span className='text-base lg:text-lg font-bold'>
                  Berlin (BER) <strong className='text-xl'>→</strong> London (LHR){' '}
                </span>
                <span className='text-sm lg:text-sm'>Sun. Mar 30</span>
              </section>
              <span className='text-xs md:text-sm mt-2'>Showing 118 of {data.totalCount} flights</span>
            </div>
            <div className='w-full hidden md:grid gap-4 lg:gap-10 overflow-hidden grid-cols-7 grid-rows-1 text-sm font-bold text-center my-4 lg:my-10 rounded bg-blue-100 py-2 bg-opacity-50'>
              <p className='col-span-2'>Airline</p>
              <p>Depart</p>
              <p>Duration</p>
              <p>Arrive</p>
              <p className='col-span-2'>Price</p>
            </div>
            {data?.flights?.map((flight) => (
              <FlightListing key={flight.idinventory} {...flight} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
