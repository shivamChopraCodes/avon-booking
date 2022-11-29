import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PassengerDetails from '../src/components/inputs/passengerDetails';
import Spinner from '../src/components/spinner';
import { useFlightsContext } from '../src/context/flightContext';
import { useTravellersContext } from '../src/context/travellerContext';

const data = [
  {
    label: 'Agency Name',
    mandatory: true,
    type: 'text',
    key: 'agencyname',
  },
  {
    label: 'Agency Address',
    mandatory: true,
    type: 'text',
    key: 'agencyaddress',
  },
  {
    label: 'Agency Email',
    mandatory: true,
    type: 'text',
    key: 'agencyemail',
  },
  {
    label: 'Agency Phone',
    mandatory: true,
    type: 'text',
    key: 'agencyphone',
  },
];
const travellerTypeText = { adults: 'adult', children: 'child', infants: 'infant' };

export default function BookFlight() {
  const [btnEnabled, setBtnEnabled] = useState(false);
  const [showSpinner, setshowSpinner] = useState(false);
  const router = useRouter();
  const [flightData, setFlightData] = useFlightsContext();
  const [travellersData, setTravellersData] = useTravellersContext();
  const totalTravelers = Object.values(travellersData.travellers).reduce((sum, current) => sum + current, 0);
  const travllersArray = Object.entries(travellersData.travellers).reduce(
    (result, [key, value], i) => [...result, ...(value ? [{ elem: i, type: travellerTypeText[key] }] : [])],
    []
  );
  const { data: userData, status: userStatus } = useSession();

  const [passengersData, setPassengersData] = useState({});
  console.log(flightData, travellersData);

  const submit = async (e) => {
    e.preventDefault();
    setshowSpinner(true);
    const reusableData = {
      pnr: flightData.pnr,
      cabinp: flightData.flighttype,
      airline: flightData.flightcompany,
      flightnumber: flightData.flightnumber,
      aircraft: flightData.aircraft,
      departure: flightData.nameofdeparturecity,
      arrival: flightData.nameofarrivalcity,
      refnummberp: flightData.referencenumber,
      duration: flightData.flightduration,
      basicfare: flightData.cost,
      totalfare: flightData.cost,
      [userData.user.userType === 'Agent' ? 'idagent' : 'idstaff']: userData.user.userId,
      farerulesp: 'Ticket is Non changeable and Non refundable',
      dateoftravel: flightData.departuredate,
      agencyname: userData.user.agencyName,
      agencyaddress: userData.user.agencyAddress,
      agencyemail: userData.user.email,
      agencyphone: userData.user.agentPhone,
      baggagedetailsp: flightData.baggage,
      sector: flightData.sector,
      inventoryid: flightData.idinventory,
      status: 'Pending',
    };
    console.log(data);
    try {
      let error = false;
      await Promise.all([
        ...Object.values(passengersData).map(async (object) => {
          const formData1 = new FormData();
          Object.entries(reusableData).forEach(([key, value]) => {
            formData1.append(key, value);
          });
          Object.entries(object).forEach(([key, value]) => {
            formData1.append(key, value);
          });
          console.log(data);
          try {
            const res = await fetch(`/api/book-flight`, {
              method: 'POST',
              body: formData1,
            });
            const response = await res.json();
            console.log(response);
            if (response.error) {
              error = true;
              toast.error(response.error, {
                position: 'top-center',
                autoClose: 3000,
              });
            } else {
            }
          } catch (e) {
            console.log(e);
          }
        }),
      ]);
      if (!error) {
        toast.success('Booking Completed', {
          position: 'top-center',
          autoClose: 3000,
        });
        router.push('/search-flights');
      }
    } catch (e) {
      toast.error('Booking Unsuccesful, Please try again later', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
    setshowSpinner(false);
  };

  useEffect(() => {
    let enableBtn = !!Object.keys(passengersData).length;
    enableBtn !== btnEnabled && setBtnEnabled(enableBtn);
  }, [passengersData]);
  useEffect(() => {
    if (!flightData) router.push('/search-flights');
  }, []);

  return (
    <>
      <div className='block mx-auto mt-20 p-6 rounded-lg shadow-lg bg-white max-w-md lg:max-w-5xl'>
        {showSpinner && (
          <div className='z-50 fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-white bg-opacity-70'>
            <Spinner />
          </div>
        )}
        <p className='font-medium text-2xl mb-6'>
          {flightData?.flightcompany} {flightData?.flighttype} {flightData?.flightnumber}
        </p>
        <form className='flex flex-col lg:flex-row lg:flex-wrap lg:gap-x-4 gap-4'>
          {travllersArray.map(({ elem, type }) => (
            <PassengerDetails
              key={elem}
              submit={(data) => setPassengersData((prev) => ({ ...prev, [elem]: { ...data } }))}
              showPassengerNumber={totalTravelers > 1}
              elem={elem}
              openOnMount={!elem}
              type={type}
            />
          ))}
        </form>
        <div className='sticky z-20 bottom-0 items-center w-full flex justify-between lg:justify-end bg-white shadow-xl border-2 border-primary-blue rounded p-4 my-4'>
          <p className='font-medium text-lg mx-2'>
            Total:{' '}
            <span className='font-bold'>
              {' '}
              ₹ {(totalTravelers * +flightData?.cost).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}
            </span>
          </p>{' '}
          <button
            onClick={(e) => btnEnabled && submit(e)}
            className={` ${btnEnabled ? 'button' : 'bg-gray-400'}
      px-8
      py-4
 color-transition  
      font-medium
      text-xs text-white 
      leading-tight
      uppercase
      rounded
      shadow-md`}
          >
            Book Now
          </button>
        </div>
      </div>
      <div className='mx-2 md:mx-auto mt-4 mb-20 p-6 rounded-lg border-2 border-dotted border-primary-yellow bg-white max-w-md lg:max-w-5xl flex flex-col'>
        <span className='text-xl font-bold'>Fare rules</span>
        Ticket is Non changeable and Non refundable
      </div>
    </>
  );
}

BookFlight.auth = true;
