import Image from 'next/image';
import Carousel from '../src/components/carousel';
import FeaturedDeals from '../src/components/featuredDeals';
import HeroInputs from '../src/components/inputs/inputsContainer';
import Services from '../src/components/services';
import Testimonial from '../src/components/testimonial';
import TravelCards from '../src/components/travelCards';
import myLoader from '../src/loader';
import styles from '../styles/Home.module.css';

const TestimonialData = [
  {
    name: 'Shivani Budhiraja',
    text: 'I took services of Avon Travels to book my flight from Delhi to Berlin and had the best experience of totally professional services . They have definitely taken care of my preferences and responded real time to my questions as well. All procedure was really smooth and and without hassle. Would definitely recommend for upcoming travels of any sort.',
  },
  {
    name: 'Rahila A',
    text: 'Avon Travels is an amazing service that’s run by people always ready to help their clients get to where they need to be. They worked with me throughout the many issues due to the pandemic and helped me get home. I’m very grateful and recommend their service to anyone looking to book a flight.',
  },
  {
    name: 'Vinod Singla',
    text: 'The customer dealing experience I have with Avon travels is very satisfactory. The workers are professional and prompt to offer you the services as per your requirement. Highly recommended if you are looking for various services for your international travel.',
  },
  {
    name: 'Bhavrit Singh',
    text: 'I am in regular touch with Avon travels. They are very professional and supporting. Even in this Corona pandemic they always kept crystal clear business and have given right advice and never raised price of tickets to sky when approximately all other agencies were doing so. I personally recommend everyone to visit them once and rest you ll find by own. I am highly impressed by their client dealings.',
  },
  {
    name: 'Navdeep Grover',
    text: 'A young passionate entrepreneur, Manik is an Amazing person and is very progressional. I got my tickets booked from India to Canada via Mexico and he was very responsive and took care of everything end to end! I certainly recommend using Avon.',
  },
  {
    name: 'Mr Singh',
    text: `We had to cancel and rebook 2 tickets due to covid. When we asked Avon Travels to proceed with the refund for those previous tickets,  they directed us to the Airline. I approached the airline via email and phone, and after a lot of effort,  they redirected me them, as my tickets were purchased through them, and not directly from the airline. So I called Manik again, and then he proceeded with the refund and got it done. So the end was good, although the initial experience wasn't good,  as they should have known that they had to get it done, rather than running away from it. Hence one star is less. Otherwise Mr Manik's dealing was wonderful.`,
  },
];

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
        <div className='gsf-testimonial-wrapper relative my-8 w-100 flex flex-col lg:flex-row justify-center lg:justify-between items-center'>
          <div className='lg:sticky lg:self-start lg:top-20 lg:w-5/12 lg:mb-24 mb-16 flex flex-col justify-center items-center pt-9 lg:items-start text-center lg:text-left'>
            <p className='text-slate-400 text-sm lg:text-lg my-3'>A WORD FROM </p>
            <p className='text-primary-blue font-black text-2xl lg:text-4xl'>Our Customers</p>
          </div>
          <div className='testimonials w-100 md:w-10/12 lg:w-7/12 flex flex-col items-center'>
            {TestimonialData.map((data) => (
              <Testimonial key={data.text} data={data} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
