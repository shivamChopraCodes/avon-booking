import Image from 'next/image';
import myLoader from '../loader';

const FlightListing = ({ flightName, flightCompany, depart, duration, arrive, price, type, flightImg }) => {
  return (
    <div className='w-full grid gap-4 lg:gap-10 overflow-hidden grid-cols-3 md:grid-cols-7 grid-rows-1 text-sm tetx-center text-center my-4 lg:my-4 shadow-lg rounded py-2 px-2 '>
      <section className='flex col-span-3 md:col-span-2 justify-start md:justify-center'>
        <div className='block rounded-lg overflow-hidden h-8 mr-2'>
          <Image loader={myLoader} src={flightImg} layout={'fixed'} width={32} height={32} />
        </div>
        <div className='flex flex-col'>
          <p>{flightCompany}</p>
          <p>{flightName}</p>
        </div>
      </section>
      <p className='text-lg font-bold'>{depart}</p>
      <section className='flex flex-col text-slate-600 text-sm items-center'>
        <p>{duration}</p>
        <p className='px-2 border-t border-slate-600 pt-2 mt-2 w-max'>{type}</p>
      </section>
      <p className='text-lg font-bold'>{arrive}</p>
      <section className='col-span-3 md:col-span-2 flex md:flex-col justify-end md:items-center text-lg font-bold'>
        <p>₹ {price}</p>
        <button className='border mx-2 md:mx-0 border-primary-blue rounded card color-transition w-36 md:my-2 text-primary-blue font-medium'>
          Book Now
        </button>
      </section>
    </div>
  );
};

export default FlightListing;
