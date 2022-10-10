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
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>About Us</p>
          <div className='w-full flex flex-wrap max-w-screen-xl p-4 my-6'>
            <img
              data-aos='fade-up'
              src='/images/avon-photo.jpeg'
              className='shadow-primary-yellow shadow-md rounded w-full h-auto lg:w-1/2'
              alt={'avon-photo'}
            />
            <p
              data-aos='fade-down'
              className='text-base lg:text-lg text-justify lg:text-left py-4 px-0 w-full lg:w-1/2 text-zinc-500 lg:px-4 lg:py-0 '
            >
              We are serving the people, since 2 decades, as a fully licensed Travel agency under the Punjab government,
              accredited with IATA (International Air Transport Association.) We have worked in close association with
              the AVON FOREX PVT LTD since 2002 which helped us in better understanding of the Global Travellers and
              serve better to the clients. They helped us in standing out in a group which differentiates us from the
              competitors. We are well aware of the fact that one never knows when he or she might find it necessary to
              utilise foreign resources; come across a situation where they need to know some foreign language or
              education. From studying to working, to get the residency in a certain country from PR to the tourism, we
              help one get all the kinds of VISA and livelihood arrangements, so that our clients do not face any kind
              of trouble while studying, working, staying in an unknown nation or having fun while being on a vacation.
            </p>
          </div>
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center'>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Featured Flight Deals</p>
          <p className='text-zinc-500 text-base my-4 '>Everything You Want & More</p>
          <FeaturedDeals />
        </div>
        <div className='py-20 w-full'>
          <Services />
        </div>
        <div className='pt-20 w-full'>
          <section className='bg-primary-blue py-8 px-8'>
            <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md bg-gray-300 rounded'>
              <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-primary-yellow '>
                Contact Us
              </h2>
              <p className='mb-8 lg:mb-16 font-light text-center text-zinc-600 sm:text-xl'>
                Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan?
                Let us know.
              </p>
              <form action='#' className='space-y-8'>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm font-medium'>
                    Your email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='shadow-sm text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                    placeholder='name@flowbite.com'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='subject' className='block mb-2 text-sm font-medium'>
                    Subject
                  </label>
                  <input
                    type='text'
                    id='subject'
                    className='block p-3 w-full text-sm text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500'
                    placeholder='Let us know how we can help you'
                    required
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Your message
                  </label>
                  <textarea
                    id='message'
                    rows='6'
                    className='block p-2.5 w-full text-sm focus:ring-primary-500 focus:border-primary-500 '
                    placeholder='Leave a comment...'
                  ></textarea>
                </div>
                <button
                  type='submit'
                  className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg b focus:outline-none focus:ring-primary-300 color-transition button'
                >
                  Send message
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
