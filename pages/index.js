import Image from 'next/image';
import Carousel from '../src/components/carousel';
import FeaturedDeals from '../src/components/featuredDeals';
import HeroInputs from '../src/components/inputs/inputsContainer';
import Services from '../src/components/services';
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
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>About Us</p>
          <TravelCards />
        </div>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center' id={'about-us'}>
          <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>About Us</p>
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
        <div className='pt-20 w-full' id='contact-us'>
          <section className='bg-primary-blue py-8 px-8'>
            <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md bg-gray-300 rounded'>
              <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-primary-yellow '>
                Contact Us
              </h2>
              <p className='mb-8 lg:mb-16 font-light text-center text-zinc-600 sm:text-xl'>
                Looking for some more info? Let us know.
              </p>
              <form action='#' className='space-y-8'>
                <div className='relative'>
                  <input
                    type='email'
                    id='floating_email'
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_email'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Your email
                  </label>
                </div>
                <div className='relative'>
                  <input
                    type='tel'
                    id='floating_phone'
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    onChange={(e) => (e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                    placeholder=' '
                  />
                  <label
                    htmlFor='floating_phone'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Your phone number
                  </label>
                </div>
                <div className='relative'>
                  <input
                    type='text'
                    id='floating_subject'
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_subject'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Subject
                  </label>
                </div>
                <div>
                  <textarea
                    id='message'
                    rows='6'
                    className='block p-2.5 w-full text-sm rounded-lg focus:outline-none focus:border-0'
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
            <div className='flex flex-col justify-center items-center  bg-gray-300 w-full lg:w-3/4 mx-auto my-8 py-4 rounded'>
              <h2 className='mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-center text-primary-yellow '>
                We Are Here For You
              </h2>
              <p className='mb-8 lg:mb-16 font-light text-center text-zinc-600 sm:text-xl'>You can reach out to us</p>
              <div className='flex flex-wrap w-full  justify-center items-center'>
                <div className='w-4/5 lg:w-auto flex items-center'>
                  <div className='block rounded-full w-24 lg:w-32 p-4 bg-white shadow-2xl overflow-hidden '>
                    <Image
                      loader={myLoader}
                      src={'/images/enquiry-icon.svg'}
                      layout={'responsive'}
                      width={'118'}
                      height={'118'}
                    />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <p className='text-xl font-bold  '>Write to us</p>
                    <a
                      className='text-base text-primary-blue hover:text-primary-yellow'
                      href='mailto:info@avontravels.com'
                    >
                      info@avontravels.com
                    </a>
                  </div>
                </div>
                <div className='w-4/5 lg:w-auto flex items-center my-4 lg:my-0 md:mx-4'>
                  <div className='block rounded-full w-24 lg:w-32 p-4 bg-white shadow-2xl overflow-hidden '>
                    <Image
                      loader={myLoader}
                      src={'/images/office-hours.svg'}
                      layout={'responsive'}
                      width={'118'}
                      height={'118'}
                    />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <p className='text-xl font-bold  '>Office hours</p>
                    <a
                      className='text-base text-primary-blue hover:text-primary-yellow'
                      href={'https://goo.gl/maps/eqbLdy89RgrW6EmTA'}
                    >
                      7 days a week <br /> 09:00am to 5:00pm
                    </a>
                  </div>
                </div>
                <div className='w-4/5 lg:w-auto flex items-center'>
                  <div className='block rounded-full w-24 lg:w-32 p-4 bg-white shadow-2xl overflow-hidden '>
                    <Image
                      loader={myLoader}
                      src={'/images/customer-care.svg'}
                      layout={'responsive'}
                      width={'118'}
                      height={'118'}
                    />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <p className='text-xl font-bold  '>Call us at</p>
                    <a className='text-base text-primary-blue hover:text-primary-yellow' href='tel:+919855555721'>
                      98555 55721
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
