import Image from 'next/image';
import Link from 'next/link';
import { toBase64 } from '../binaryConverter';
import myLoader from '../loader';
import { dateToIndian } from '../utils/dateFormatter';

const FlightListing = ({
  idinventory,
  flightName,
  flightcompany,
  departuredate,
  flightduration,
  arrivaldate,
  flightnumber,
  cost,
  type,
  logo,
  paginationref,
}) => {
  return (
    <div
      {...(paginationref && { ref: paginationref })}
      className='w-full grid gap-4 lg:gap-10 overflow-hidden grid-cols-3 md:grid-cols-7 grid-rows-1 text-sm tetx-center text-center my-4 lg:my-4 shadow-lg rounded py-2 px-2 '
    >
      <section className='flex col-span-3 md:col-span-2 justify-start md:justify-center'>
        <div className='block rounded-lg overflow-hidden h-10 mr-2'>
          <Image
            loader={myLoader}
            src={`data:image/jpeg;base64,${toBase64(logo.data)}`}
            layout={'fixed'}
            width={80}
            height={40}
            alt={'logo'}
          />
        </div>
        <div className='flex flex-col text-left'>
          <p className='font-bold'> {flightcompany}</p>
          <p>{flightnumber}</p>
        </div>
      </section>
      <p className='text-lg font-bold'>{dateToIndian(departuredate)}</p>
      <section className='flex flex-col text-slate-600 text-sm items-center'>
        <p>{flightduration}</p>
        <p className='px-2 border-t border-slate-600 pt-2 mt-2 w-max'>{type}</p>
      </section>
      <p className='text-lg font-bold'>{dateToIndian(arrivaldate)}</p>
      <section className='col-span-3 md:col-span-2 flex md:flex-col justify-end md:items-center text-lg font-bold'>
        <p>₹ {(+cost).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}</p>
        <Link href={`/flight-details/${idinventory}`}>
          <button className='border mx-2 py-2 md:mx-0 bg-primary-blue rounded-md button color-transition w-36 md:my-2 text-white font-medium'>
            Book Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default FlightListing;
