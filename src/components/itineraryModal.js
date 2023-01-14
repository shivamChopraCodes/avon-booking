import { useRef } from 'react';
import { useFlightsContext } from '../context/flightContext';
import { dateToIndian } from '../utils/dateFormatter';

const ItineraryModal = ({ onClose, onBook }) => {
  const [flightDetails, setFlightData] = useFlightsContext();
  const wrapperRef = useRef();

  const wrapperClick = (e) => {
    if (e.target === wrapperRef.current) onClose();
  };

  return (
    <div
      ref={wrapperRef}
      onClick={wrapperClick}
      className='fixed backdrop-blur-sm top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex justify-center items-center '
    >
      <div className='relative w-full max-w-2xl h-auto'>
        <div className='relative bg-white rounded-lg shadow'>
          <div className='flex items-start justify-between p-4 border-b rounded-t'>
            <h3 className='text-xl font-semibold text-gray-900'>Itinerary</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
              onClick={onClose}
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='p-6 space-y-6'>
            <ol className='relative border-l border-gray-700 my-4'>
              <li className='mb-10 ml-4'>
                <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
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
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                    <p className='text-base font-normal text-gray-500'>
                      Travel Duration: {flightDetails.departuretotransferduration}h
                    </p>
                  </li>
                  <li className='mb-10 ml-4'>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                    <time className='mb-1 text-sm font-normal leading-none text-gray-500'>
                      {dateToIndian(flightDetails.transferdate)} {flightDetails.departuretotransfertime}
                    </time>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {flightDetails.tranferairpot}, {flightDetails.transfercityname}
                    </h3>
                    <p className='text-base font-normal text-gray-500'>
                      Halt period: {flightDetails.transferstayduration}h
                    </p>
                  </li>
                </>
              )}
              <li className='mb-10 ml-4'>
                <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                <p className='text-base font-normal text-gray-500'>
                  Travel Duration:{' '}
                  {+flightDetails.layover ? flightDetails.transfertoarrivalduration : flightDetails.flightduration}h
                </p>
              </li>
              <li className='ml-4'>
                <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                <time className='mb-1 text-sm font-normal leading-none text-gray-500'>
                  {dateToIndian(flightDetails.arrivaldate)} {flightDetails.arrivaltime}
                </time>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {flightDetails.arrivalairpot}, {flightDetails.nameofarrivalcity}
                </h3>
              </li>
            </ol>
          </div>
          <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded'>
            <button
              onClick={onBook}
              className='border mx-2 py-2 md:mx-0 bg-primary-blue rounded-md button color-transition w-36 md:my-2 text-white font-medium'
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryModal;
