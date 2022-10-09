import Head from 'next/head';
import Image from 'next/image';
import FeaturedDeals from '../src/components/featuredDeals';
import HeroInputs from '../src/components/inputs/inputsContainer';
import Services from '../src/components/services';
import TravelCards from '../src/components/travelCards';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div
          className={`${styles.headWrapper} index-header-wrapper flex flex-col justify-center items-center text-white `}
        >
          <h1 className='flex flex-col justify-center items-center text-center '>
            <p className=' text-xl font-semibold '>The best tour experience</p>
            <p className=' text-[28px] font-bold my-4 '>
              find and book best <span className='text-primary-yellow'>tickets</span>
            </p>
          </h1>
          <HeroInputs />
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center'>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Amazing travel deals & More</p>
          <p className='text-zinc-500 text-base my-4 '>Explore the best of travel with our excluisve deals</p>
          <TravelCards />
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center'>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Featured Flight Deals</p>
          <p className='text-zinc-500 text-base my-4 '>Everything You Want & More</p>
          <FeaturedDeals />
        </div>
        <div className='py-20 w-full'>
          <Services />
        </div>
      </main>
    </div>
  );
}
