import Image from 'next/image';
import Carousel from '../src/components/carousel';
import FeaturedDeals from '../src/components/featuredDeals';
import HeroInputs from '../src/components/inputs/inputsContainer';
import Services from '../src/components/services';
import Testimonial from '../src/components/testimonial';
import TravelCards from '../src/components/travelCards';
import myLoader from '../src/loader';
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
        <div className='py-20 flex flex-col w-full justify-center items-center text-center' id={'about-us'}>
          <p
            className='text-2xl lg:text-3xl font-bold text-primary-blue'
            data-aos='fade-down'
            data-aos-anchor-placement='top-bottom'
          >
            Amazing Deals
          </p>
          <TravelCards />
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center' id={'featured-deals'}>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Weekly Specials</p>
          <FeaturedDeals />
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center overflow-hidden'>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Our Partners</p>
          <div className='w-11/12 my-8'>
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
