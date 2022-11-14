import Image from 'next/image';
import { useEffect, useState } from 'react';
import Carousel from '../src/components/carousel';
import DealSlider from '../src/components/dealsSlider';
import FeaturedDeals from '../src/components/featuredDeals';
import HeroInputs from '../src/components/inputs/inputsContainer';
import Services from '../src/components/services';
import Testimonial from '../src/components/testimonial';
import TravelCards from '../src/components/travelCards';
import styles from '../styles/Home.module.css';

// export async function getStaticProps() {
// Fetch data from external API
//   const res = await fetch(`${process.env.BASE_URL}/api/homepage-data/best-tour`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const res2 = await fetch(`${process.env.BASE_URL}/api/homepage-data/amazing-deals`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const res3 = await fetch(`${process.env.BASE_URL}/api/homepage-data/weekly-specials`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const res4 = await fetch(`${process.env.BASE_URL}/api/homepage-data/weekly-specials?skip=2`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const best_tour = await res.json();
//   const amazing_deals = await res2.json();
//   const weekly_specials1 = await res3.json();
//   const weekly_specials2 = await res4.json();

//   // Pass data to the page via props
//   return {
//     props: {
//       data: {
//         weekly_specials: [...weekly_specials1.weekly_specials, ...weekly_specials2.weekly_specials],
//         ...best_tour,
//         ...amazing_deals,
//       },
//     },
//     revalidate: 10,
//   };
// }

export default function Home() {
  const [data, setData] = useState({});
  const [weeklySpecials, setWeeklySpecials] = useState(null);
  const fetchWeeklySpecials = async () => {
    const res = await fetch(`./api/homepage-data/best-tour`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res2 = await fetch(`./api/homepage-data/amazing-deals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res3 = await fetch(`./api/homepage-data/weekly-specials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res4 = await fetch(`./api/homepage-data/weekly-specials?skip=2`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const best_tour = await res.json();
    const amazing_deals = await res2.json();
    const weekly_specials1 = await res3.json();
    const weekly_specials2 = await res4.json();
    setData({
      weekly_specials: [...weekly_specials1.weekly_specials, ...weekly_specials2.weekly_specials],
      ...best_tour,
      ...amazing_deals,
    });
  };
  useEffect(() => {
    fetchWeeklySpecials();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div
          className={`${styles.headWrapper} index-header-wrapper flex flex-col justify-center lg:justify-end items-center text-white `}
        >
          <h1 className='flex flex-col justify-center items-center text-center lg:mt-60'>
            <p className=' text-xl font-semibold '>The best tour experience</p>
            <p className=' text-[28px] font-bold my-4 '>
              find and book best <span className='text-primary-yellow'>tickets</span>
            </p>
          </h1>
          <div className='w-5/6 lg:w-10/12 mt-16 overflow-hidden deals-slider'>
            <DealSlider logos={data?.logos} data={data?.best_tour} />
          </div>
        </div>
        <div
          className='py-20 flex flex-col w-full justify-center items-center text-center lg:-mt-52 relative z-10 bg-white'
          id={'about-us'}
        >
          <p
            className='text-2xl lg:text-3xl font-bold text-primary-blue'
            data-aos='fade-down'
            data-aos-anchor-placement='top-bottom'
          >
            Amazing Deals
          </p>
          <TravelCards logos={data?.logos} data={data?.amazing_deals} />
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center' id={'featured-deals'}>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Weekly Specials</p>
          <FeaturedDeals logos={data?.logos} data={data.weekly_specials} />
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center overflow-hidden'>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Our Partners</p>
          <div className='w-11/12 lg:w-5/6 my-8'>
            <Carousel />
          </div>
        </div>
        <div className='py-20 w-full' id='services'>
          <Services />
        </div>
        <div className=' relative my-8 w-100 flex flex-col justify-center lg:justify-between items-center'>
          <div className=' mb-4 flex flex-col justify-center items-center pt-9  text-center '>
            <p className='text-slate-400 text-sm lg:text-lg my-3'>A WORD FROM </p>
            <p className='text-primary-blue font-black text-2xl lg:text-4xl'>Our Customers</p>
          </div>
          <div className='testimonials w-100  flex flex-col items-center'>
            <Testimonial />
          </div>
        </div>
      </main>
    </div>
  );
}
