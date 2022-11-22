import Image from 'next/image';
import myLoader from '../../src/loader';
import styles from '../../styles/Home.module.css';
import { toBase64 } from '../../src/binaryConverter';
import { dateToIndian } from '../../src/utils/dateFormatter';
import TravellerInput from '../../src/components/inputs/travellerInputs';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.BASE_URL}/api/search-flight?flightId=${context.params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const flightDetails = await res.json();

  // Pass data to the page via props
  return {
    props: { ...flightDetails }, // will be passed to the page component as props
  };
}

export default function FlightPage({ router, flightDetails, logo }) {
  const [passengers, setPassengers] = useState({
    travellers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  });
  console.log(flightDetails, logo);
  return (
    <div className={styles.container}>
      <main className={`${styles.main} justify-start pt-20  lg:pt-32 max-w-md lg:max-w-5xl mx-auto px-4`}>
        <div className='w-full flex flex-col items-start mt-4 shadow-xl px-2 lg:px-8'>
          <div className='w-full justify-between items-center flex'>
            <p className='text-lg lg:text-2xl  font-bold text-left'>
              {flightDetails.nameofdeparturecity} to {flightDetails.nameofarrivalcity}
            </p>
            <p className='text-slate-500 text-sm lg:text-lg font-bold text-left'>
              {dateToIndian(flightDetails.departuredate)} to {dateToIndian(flightDetails.arrivaldate)}
            </p>
          </div>
          <div className='flex w-full justify-between items-center my-8'>
            <div className='flex items-center'>
              <div className='block relative w-20 md:w-40 rounded h-10 md:h-20 overflow-hidden mr-2 '>
                <Image
                  loader={myLoader}
                  src={`data:image/jpeg;base64,${toBase64(logo.logo.data)}`}
                  layout={'fill'}
                  alt={'logo'}
                />
              </div>
              <aside className='flex flex-col'>
                <span className='tex-base lg:text-lg font-medium'>{flightDetails.flightcompany}</span>
                <span className='text-sm lg:text-base text-primary-yellow slate-500 font-medium'>
                  {flightDetails.flighttype}
                </span>
              </aside>
            </div>
            <p className='text-xl lg:text-2xl font-bold text-left'>
              ₹ {(+flightDetails.cost).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}
            </p>
          </div>
          <div className='w-full flex flex-wrap lg:flex-nowrap my-8 items-center justify-between'>
            <div className='flex items-center w-full'>
              <span className='text-base md:text-lg mr-5'>Seats available: {flightDetails.numberofseats}</span>
              <TravellerInput
                hideFlightType={true}
                width={'w-full lg:w-1/3'}
                img={'/images/people.svg'}
                value={passengers}
                onChange={(value) => setPassengers({ ...value })}
                max={flightDetails.numberofseats}
                dropdownClasses={'shadow-xl'}
              />
            </div>
            <div className='w-full md:w-auto flex justify-end my-2 md:my-0'>
              <button className='border mx-2 py-2 md:mx-0 bg-primary-blue rounded-md button color-transition w-36  text-white font-medium'>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col items-center mt-4 shadow-xl px-2 lg:px-8 py-8'>
          <p className='text-lg self-start '>
            <span className='font-bold'>Journey Duration:</span> {flightDetails.flightduration}h
          </p>
          <div className='flex flex-col items-start justify-center my-8'>
            <p className='font-bold text-lg'>Itineray</p>
            <ol className='relative border-l border-gray-700 my-4'>
              <li className='mb-10 ml-4'>
                <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                <time className='mb-1 text-sm font-normal leading-none text-gray-500'>
                  {dateToIndian(flightDetails.departuredate)} {flightDetails.departuretime}
                </time>
                <h3 className='text-lg font-semibold text-gray-90'>
                  {flightDetails.departureairpot}, {flightDetails.nameofdeparturecity}
                </h3>
              </li>
              {+flightDetails.layover && (
                <>
                  <li className='mb-10 ml-4'>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                    <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                      Travel Duration: {flightDetails.departuretotransfertime}h
                    </p>
                  </li>
                  <li className='mb-10 ml-4'>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                    <time className='mb-1 text-sm font-normal leading-none text-gray-500'>
                      {dateToIndian(flightDetails.transferdate)} {flightDetails.departuretotransfertime}
                    </time>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {flightDetails.tranferairpot}, {flightDetails.transfercityname}
                    </h3>
                    <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                      Halt period: {flightDetails.transferstayduration}h
                    </p>
                  </li>
                </>
              )}
              <li className='mb-10 ml-4'>
                <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                  Travel Duration:{' '}
                  {+flightDetails.layover ? flightDetails.departuretotransfertime : flightDetails.flightduration}h
                </p>
              </li>
              <li className='ml-4'>
                <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                <time className='mb-1 text-sm font-normal leading-none text-gray-500'>
                  {dateToIndian(flightDetails.arrivaldate)} {flightDetails.arrivaltime}
                </time>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {flightDetails.arrivalairpot}, {flightDetails.nameofarrivalcity}
                </h3>
              </li>
            </ol>
          </div>
        </div>
        <div className='sticky bottom-0 items-center w-full flex justify-between lg:justify-end bg-white shadow-xl border-2 border-primary-blue rounded p-4 my-4'>
          <p className='font-medium text-lg'>
            Total:{' '}
            <span className='font-bold'>
              {' '}
              ₹{' '}
              {(
                Object.values(passengers.travellers).reduce((sum, current) => sum + current, 0) * +flightDetails.cost
              ).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}
            </span>
          </p>{' '}
          <button className='border mx-2 py-2 bg-primary-blue rounded-md button color-transition w-36  text-white font-medium'>
            Book Now
          </button>
        </div>
      </main>
    </div>
  );
}

FlightPage.auth = true;
