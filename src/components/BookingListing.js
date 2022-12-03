import Image from 'next/image';
import Link from 'next/link';
import { serverbase64, toBase64 } from '../binaryConverter';
import myLoader from '../loader';
import { dateToIndian } from '../utils/dateFormatter';

const BookingListing = ({
  inventory: {
    flightcompany,
    departuredate,
    arrivaldate,
    flighttype,
    departureairpot,
    departuretime,
    arrivalairpot,
    arrivaltime,
  },
  cabinp,
  idbooknow,
  flightnumber,
  pnr,
  duration,
  createdat,
  updatedat,
  tax,
  discount,
  discountcoupon,
  basicfare,
  totalfare,
  netfare,
  arrival,
  aircraft,
  refnummberp,
  departure,
  dateoftravel,
  title,
  firstnamep,
  lastnamep,
  typep,
  genderp,
  status,
  departureterminal,
  arrivalterminal,
  logo,
  paginationref,
}) => {
  return (
    <div
      {...(paginationref && { ref: paginationref })}
      className='w-full flex flex-col  gap-x-4 text-sm text-center my-4 lg:my-4 shadow-lg rounded'
    >
      <section className='w-full text-left px-4 lg:px-8 py-4 bg-gradient-to-r rounded-t from-yellow-300 to-primary-yellow capitalize flex items-center flex-wrap justify-between  '>
        <div className='flex flex-col '>
          <span className='text-base text-white lg:text-xl font-bold'>
            {departure}
            <strong className='text-xl'> →</strong> {arrival}{' '}
          </span>
          <span className='text-sm text-white lg:text-lg font-medium'>
            {new Date(dateoftravel).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className='text-sm whitespace-nowrap flex flex-col lg:flex-row lg:text-base text-white my-4 lg:my-0 '>
          <span className='text-sm whitespace-nowrap flex lg:text-base text-white '>Reference Number:</span>
          <strong className='ml-2 text-right'>{refnummberp}</strong>
        </div>
      </section>
      <div className='flex justify-between flex-wrap w-full '>
        <div className='flex flex-col w-full lg:w-1/2'>
          <section className='flex justify-start items-center w-full my-4 px-4 lg:px-8 '>
            <div className='block w-20 rounded-lg overflow-hidden h-10 mr-2'>
              <Image
                loader={myLoader}
                src={`data:image/jpeg;base64,${serverbase64(logo.data)}`}
                layout={'fixed'}
                width={80}
                height={40}
                alt={'logo'}
              />
            </div>
            <div className='flex flex-col text-left'>
              <p className='font-bold'> {flightcompany}</p>
              <p className='uppercase'>{flightnumber}</p>
            </div>
            <span className='border-l border-dashed border-slate-400 text-base font-medium text-slate-400 px-2 mx-2'>
              {cabinp}
            </span>
          </section>
          <div className='w-full flex px-4 lg:px-8 justify-center lg:justify-start items-start py-4'>
            <section className='flex flex-col items-center lg:items-start'>
              <span className='text-base lg:text-2xl font-bold'>{departure.substr(0, 3)}</span>
              <span className='text-sm lg:text-base text-slate-500 font-medium'>{departureairpot}</span>
              <span className='text-sm lg:text-base text-slate-500 font-medium h-2'>{departureterminal}</span>
              <div className='flex flex-col items-center lg:items-start my-4'>
                <span className='text-sm lg:text-base text-slate-400'>Departure:</span>
                <p className='text-base font-semibold mt-2'>{dateToIndian(departuredate)}</p>
                <p className='text-base text-slate-400'>{departuretime}</p>
              </div>
            </section>
            <div className='flex flex-col items-center'>
              <div className='block  rounded-lg rotate-45 mx-20 '>
                <Image
                  loader={myLoader}
                  src={`/images/plane-icon.svg`}
                  layout={'fixed'}
                  width={20}
                  height={20}
                  alt={'logo'}
                />
              </div>
              <span className='my-2 text-sm text-slate-400'>Duration: {duration} hrs</span>
            </div>
            <section className='flex flex-col  items-center lg:items-start pl-4'>
              <span className='text-base lg:text-2xl font-bold'>{arrival.substr(0, 3)}</span>
              <span className='text-sm lg:text-base text-slate-500 font-medium'>{arrivalairpot}</span>
              <span className='text-sm lg:text-base text-slate-500 font-medium h-2'>{arrivalterminal}</span>
              <div className='flex flex-col items-center lg:items-start my-4'>
                <span className='text-sm lg:text-base text-slate-400'>Arrival:</span>
                <p className='text-base font-semibold mt-2'>{dateToIndian(arrivaldate)}</p>
                <p className='text-base text-slate-400'>{arrivaltime}</p>
              </div>
            </section>
          </div>
        </div>
        <div className='flex flex-col w-full lg:w-1/2 px-4 lg:px-8 py-4'>
          <div className='flex flex-col items-center lg:items-start'>
            <span className='text-base text-left lg:text-lg font-bold w-full'>Traveller info</span>
            <div className='flex items-center lg:items-start justify-between w-full'>
              <p className='text-sm lg:text-base font-normal uppercase '>
                <span className='font-bold'>{title}</span>
                <span className='font-bold mx-2 '>{lastnamep}</span>
                <span>{firstnamep}</span>
              </p>
              <span className='text-sm lg:text-base capitalize'>
                {typep} {genderp}
              </span>
            </div>
          </div>
          <div className='mt-4 w-full flex items-center justify-between text-base lg:text-lg'>
            <span className='text-slate-400 '>Status</span>
            <span
              className={`${
                status?.toLowerCase() === 'approved'
                  ? 'text-green-400'
                  : status?.toLowerCase() === 'pending'
                  ? 'text-primary-yellow'
                  : 'text-red-600'
              }`}
            >
              {status}
            </span>
          </div>
          {createdat && (
            <div className='my-2 w-full flex items-center justify-between text-base lg:text-lg'>
              <span className='text-slate-400 '>Booking Date</span>
              <span>{dateToIndian(createdat)}</span>
            </div>
          )}
          {status?.toLowerCase() !== 'pending' && updatedat && (
            <div className='mb-4 w-full flex items-center justify-between text-base lg:text-lg'>
              <span className='text-slate-400 '> {status} Date</span>
              <span>{dateToIndian(updatedat)}</span>
            </div>
          )}
          <section className='flex flex-col items-start w-full text-lg my-8 '>
            <p className=' text-base lg:text-lg font-bold mb-2'>Payment Details</p>
            <div className='flex w-full justify-between text-sm lg:text-base'>
              <p>Total Fare:</p>
              <p className='text-base lg:text-lg font-bold'>
                ₹ {(+totalfare).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}
              </p>
            </div>
            {status?.toLowerCase() === 'approved' && (
              <>
                <div className='flex w-full justify-between text-sm lg:text-base'>
                  <p>
                    Discount{' '}
                    {discountcoupon && (
                      <span className='font-normal'>
                        Code : <strong className='text-green-400 uppercase'>{discountcoupon}</strong>
                      </span>
                    )}
                  </p>
                  <p className='text-base lg:text-lg text-green-400 font-medium'>
                    - ₹ {(+(discount || 0)).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}
                  </p>
                </div>
                <div className='flex w-full justify-between text-sm lg:text-base'>
                  <p>Net Fare:</p>
                  <p className='text-base lg:text-lg font-bold'>
                    ₹ {(+netfare).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookingListing;
