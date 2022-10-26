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
