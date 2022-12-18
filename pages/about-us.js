import Image from 'next/image';
import myLoader from '../src/loader';
import styles from '../styles/Home.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className='py-20 flex flex-col w-full justify-center items-center text-center mt-10'>
          <div className='w-full flex flex-col'>
            <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>About Us</p>
            <div className='w-full flex flex-wrap max-w-screen-xl p-4 my-6'>
              <div className='block shadow-primary-yellow shadow-md rounded w-full md:w-3/4 lg:w-1/2 mx-auto'>
                <Image
                  loader={myLoader}
                  data-aos='fade-up'
                  src='/images/avon-photo.jpeg'
                  alt={'avon-photo'}
                  width={600}
                  height={620}
                  layout={'responsive'}
                />
              </div>
              <div className='text-base  lg:text-lg text-justify lg:text-left py-4 px-0 w-full lg:w-1/2 text-zinc-500 lg:px-4 lg:py-0 '>
                <p data-aos='fade-down'>
                  We are serving the people, since 2 decades, as a fully licensed Travel agency under the Punjab
                  government, accredited with IATA (International Air Transport Association.) We have worked in close
                  association with the AVON FOREX PVT LTD since 2002 which helped us in better understanding of the
                  Global Travellers and serve better to the clients. They helped us in standing out in a group which
                  differentiates us from the competitors. We are well aware of the fact that one never knows when he or
                  she might find it necessary to utilise foreign resources; come across a situation where they need to
                  know some foreign language or education. From studying to working, to get the residency in a certain
                  country from PR to the tourism, we help one get all the kinds of VISA and livelihood arrangements, so
                  that our clients do not face any kind of trouble while studying, working, staying in an unknown nation
                  or having fun while being on a vacation.
                </p>
                <p className='my-4'>
                  We have developed ourselves as one of the largest Airlines Consolidator and Travel Facilitator because
                  of the continuous efforts, hardwork, integrity and adherence to the ethics. We proudly operate our
                  business in a professional and responsible way, for we have the travel experts inspired and guided by
                  our core principles of Creating Trust Globally in the Travel Business, allowing us to satisfy a
                  substantial number of clients.
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full justify-center items-center text-center my-10'>
            <p className='text-2xl lg:text-3xl font-bold text-primary-blue'>Our Director</p>
            <div className='w-full flex flex-wrap lg:flex-row-reverse max-w-screen-xl p-4 my-6'>
              <div className='block shadow-primary-yellow shadow-md rounded w-3/4 lg:w-1/3 mx-auto'>
                <Image
                  loader={myLoader}
                  data-aos='fade-up'
                  src='/images/director.jpg'
                  alt={'avon-director-manik'}
                  width={400}
                  height={624}
                  layout={'responsive'}
                />
              </div>
              <div className='text-base  lg:text-lg text-justify lg:text-right py-4 px-0 w-full lg:w-2/3 text-zinc-500 lg:px-4 lg:py-0 '>
                <p data-aos='fade-down'>
                  Dear Travellers, The past few years have been very tough for all of us with the sudden & sharp spread
                  of COVID - 19 in India and over the world. We are following up with an update on our team{`'`}s
                  relentless efforts to serve our customers despite the countrywide lockdown constraints.
                </p>
                <p className='my-4'>
                  Our customer support team has been tirelessly working around the clock to resolve support requests
                  that saw a surge of over 200% as a result of COVID-19 disruption
                </p>
                <p className='my-4'>
                  We worked very hard alongside our partners to set up completely new infrastructure and workflows to
                  enable our customer service staff to work from home. We are happy to share that through their
                  relentless efforts, Even in times of COVID, we managed to provide our clients all the tickets which
                  could help them to get to their home country safely.
                </p>
                <p className='my-4'>
                  All this while, we are ensuring that our customers remain in the know of latest developments on
                  policies related to refunds, cancellations and amendments through our social media channels and 24*7
                  working team.
                </p>
                <p>
                  We would like to assure you that we are leaving no stone unturned to serve you to your satisfaction in
                  these times. We would like to thank you once again for your patronage and we look forward to seeing
                  you travel with us again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
