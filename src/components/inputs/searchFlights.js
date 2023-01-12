import { useEffect, useRef, useState } from 'react';
import { useFiltersContext } from '../../context/filtersContext';
import { useTravellersContext } from '../../context/travellerContext';
import CheckRadioButton from './checkRadioInputs';
import DatePicker from './dateInputs';
import TextSearchInput from './textInput';
import TravellerInput from './travellerInputs';

const radios = ['one-way', 'return'];

const inputsData = {
  'one-way': [
    {
      input: TextSearchInput,
      key: 'origin',
      placeholder: 'Origin',
      img: '/images/location.svg',
    },
    {
      input: TextSearchInput,
      key: 'destination',
      placeholder: 'Destination',
      img: '/images/location.svg',
    },
    {
      input: DatePicker,
      key: 'departDate',
      placeholder: 'Depart Date',
      img: '/images/calendar.svg',
    },
    {
      input: TravellerInput,
      key: 'details',
      img: '/images/people.svg',
    },
  ],
  return: [
    {
      input: TextSearchInput,
      key: 'origin',
      placeholder: 'Origin',
      img: '/images/location.svg',
    },
    {
      input: TextSearchInput,
      key: 'destination',
      placeholder: 'Destination',
      img: '/images/location.svg',
    },
    {
      input: DatePicker,
      key: 'departDate',
      placeholder: 'Depart Date',
      img: '/images/calendar.svg',
      showReturn: true,
    },
    {
      input: TravellerInput,
      key: 'details',
      img: '/images/people.svg',
    },
  ],
};

const SearchFlights = ({ cities, submit }) => {
  const inputRef = useRef();
  const [selectedRadio, setSelectedRadio] = useState('one-way');
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: '',
    details: {
      travellers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      type: 'Economy Class',
    },
  });
  const [filters, setFilters] = useFiltersContext();

  const [travellersData, setTravellersData] = useTravellersContext();
  const handleSubmit = () => {
    if (!inputRef.current.value || !formData.origin || !formData.destination) return null;
    const [startDate, endDate] = inputRef.current.value.split(' - ').map((val) => {
      const splitVal = val.split('/');
      return `${splitVal[2]}-${splitVal[1]}-${splitVal[0]}`;
    });
    setTravellersData({ ...formData.details });
    const occupants = formData.details.travellers.adults + formData.details.travellers.children;
    const {
      origin,
      destination,
      details: { type },
    } = formData;
    setFormData((prev) => ({
      ...prev,
      departDate: inputRef.current.value,
    }));
    setFilters((prev) => ({
      ...prev,
      ...formData,
      departDate: inputRef.current.value,
      showDates: inputRef.current.value.split(' - '),
    }));
    submit({
      startDate,
      endDate,
      origin,
      destination,
      occupants,
      type,
      showDates: inputRef.current.value.split(' - '),
    });
  };
  useEffect(() => {
    if (filters.origin) {
      const { origin, destination, departDate, details } = filters;
      setFormData({ origin, destination, departDate, details });
      inputRef.current.value = filters.departDate;
    }
  }, []);
  return (
    <div className='w-full bg-slate-400 bg-opacity-50 py-6' data-aos='fade-up' data-aos-anchor-placement='top-bottom'>
      <div className='w-full max-w-screen-xl flex flex-col items-center mx-auto'>
        <div className='flex items-center self-start ml-2 lg:ml-0 '>
          {radios.map((btn) => (
            <CheckRadioButton
              key={btn}
              name={`hero-radio-${btn}`}
              label={btn}
              type={'radio'}
              isChecked={selectedRadio === btn}
              handleChange={() => setSelectedRadio(btn)}
              wrapperClasses={'mx-3'}
            />
          ))}
        </div>
        <div className='flex flex-col xl:flex-row lg:flex-wrap w-11/12 lg:w-full rounded bg-white p-2 my-4 mx-2'>
          {inputsData[selectedRadio].map((input) => (
            <input.input
              key={input.key}
              placeholder={input.placeholder}
              value={formData[input.key]}
              img={input.img}
              {...(input.key === 'departDate' && { inputRef })}
              {...(input.key === 'origin' && {
                options: cities.filter((city) => city.cityname !== formData.destination),
              })}
              {...(input.key === 'destination' && {
                options: cities.filter((city) => city.cityname !== formData.origin),
              })}
              {...(input.key === 'details' && { max: 4 })}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  [input.key]: value,
                }))
              }
              {...(input.showReturn && {
                returnPlaceHolder: 'Return Date',
                returnValue: formData.returnDate,
                onReturnChange: (value) =>
                  setFormData((prev) => ({
                    ...prev,
                    returnDate: value,
                  })),
              })}
            />
          ))}
          <div className='w-full lg:w-1/6  px-2 my-4 lg:mt-0 lg:mb-0'>
            <button
              onClick={handleSubmit}
              type='submit'
              className='w-full color-transition button cursor-pointer text-white text-center flex justify-center items-center font-semibold rounded py-3'
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlights;
