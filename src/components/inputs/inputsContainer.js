import { useState } from 'react';
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

const HeroInputs = () => {
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
      type: 'economy',
    },
  });
  return (
    <div className='w-full bg-white bg-opacity-50 py-6' data-aos='fade-up' data-aos-anchor-placement='top-bottom'>
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
          <buton className='color-transition button cursor-pointer text-white w-full lg:w-56 text-center flex justify-center items-center font-semibold rounded py-2'>
            Search
          </buton>
        </div>
      </div>
    </div>
  );
};

export default HeroInputs;
