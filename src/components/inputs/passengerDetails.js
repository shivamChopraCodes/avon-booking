import { useEffect, useState } from 'react';
import CheckRadioButton from './checkRadioInputs';

const passengerInputs = [
  {
    label: 'First Name',
    mandatory: true,
    type: 'text',
    key: 'firstnamep',
  },
  {
    label: 'Last Name',
    mandatory: true,
    type: 'text',
    key: 'lastnamep',
  },
  {
    label: 'Title',
    mandatory: true,
    type: 'dropdown',
    key: 'title',
    options: ['Mr', 'Mrs', 'Ms'],
  },
  {
    label: 'Gender',
    mandatory: true,
    type: 'dropdown',
    key: 'genderp',
    options: ['Male', 'Female', 'Others'],
  },
  {
    label: 'Date of Birth',
    mandatory: true,
    type: 'date',
    key: 'dobp',
  },
  {
    label: 'Phone Number',
    mandatory: true,
    type: 'text',
    key: 'mobilep',
  },
  {
    label: 'Nationality',
    mandatory: true,
    type: 'text',
    key: 'nationality',
  },
  {
    label: 'Baggage Details',
    mandatory: true,
    type: 'text',
    key: 'baggagedetailsp',
  },
  {
    label: 'Sector',
    mandatory: true,
    type: 'text',
    key: 'sector',
  },
  {
    label: 'Passport No.',
    mandatory: true,
    type: 'text',
    key: 'passportnop',
  },
  {
    label: 'Passport Place',
    mandatory: true,
    type: 'text',
    key: 'passportplace',
  },
  {
    label: 'Passport Expiry Date',
    mandatory: true,
    type: 'date',
    key: 'passportexpiryp',
  },
  {
    label: 'Passport Front (Max Size: 1MB)',
    mandatory: true,
    type: 'file',
    key: 'passportpicfrontp',
  },
  {
    label: 'Passport Back (Max Size: 1MB)',
    mandatory: true,
    type: 'file',
    key: 'passportpicbackp',
  },
  {
    label: 'Visa (Max Size: 1MB)',
    mandatory: true,
    type: 'file',
    key: 'visa',
  },
  {
    label: 'Pan Card (Max Size: 1MB)',
    mandatory: true,
    type: 'file',
    key: 'pancard',
  },
];

const radiobtns = [
  {
    label: 'AVML(Vegetarian Meal)',
    mandatory: true,
    type: 'checkbox',
    key: 'ssravml',
    value: 'AVML',
  },
  {
    label: 'HNML(Non-Vegetarian Meal)',
    mandatory: true,
    type: 'checkbox',
    key: 'ssrhnml',
    value: 'HNML',
  },
  {
    label: 'VGML(Vegan Meal) ',
    mandatory: true,
    type: 'checkbox',
    key: 'ssrvgml',
    value: 'VGML',
  },
  {
    label: 'WCHR (Wheelchair Assistance)',
    mandatory: true,
    type: 'checkbox',
    key: 'ssrwchr',
    value: 'WCHR',
  },
];

const PassengerDetails = ({ elem, showPassengerNumber, submit, openOnMount }) => {
  const [showData, setShowData] = useState(false);
  const [passengerData, setPassengerData] = useState({
    title: 'Mr',
    firstnamep: '',
    lastnamep: '',
    genderp: 'Male',
    dobp: '',
    mobilep: '',
    nationality: '',
    baggagedetailsp: '',
    sector: '',
    passportnop: '',
    passportplace: '',
    passportpicfrontp: '',
    passportpicbackp: '',
    visa: '',
    pancard: '',
  });
  const [btnEnabled, setBtnEnabled] = useState(false);
  useEffect(() => {
    let enableBtn = Object.keys(passengerData).reduce((result, key) => result && !!passengerData[key], true);
    enableBtn !== btnEnabled && setBtnEnabled(enableBtn);
  }, [passengerData]);
  useEffect(() => {
    if (openOnMount) setShowData(true);
  }, []);
  return (
    <div key={elem} className='w-full' data-accordion='collapse'>
      <h2 className='  border border-gray-900 rounded-lg'>
        <button
          type='button'
          onClick={() => setShowData((prev) => !prev)}
          className='flex items-center justify-between w-full p-5 font-medium text-left'
        >
          <span>Passenger{showPassengerNumber ? ' ' + (elem + 1) : ''} Details</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 ${showData && 'rotate-180'} shrink-0`}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </button>
      </h2>
      {showData && (
        <div className='flex flex-col px-4 lg:flex-row lg:flex-wrap lg:gap-x-4 gap-2 border border-t-0 border-gray-400 rounded-lg py-4'>
          {passengerInputs.map((item) => (
            <div className='relative my-4 w-full lg:w-[49%]' key={item.key}>
              {item.type === 'dropdown' ? (
                <select
                  type={item.type}
                  id={`floating_${item.key}_${elem}`}
                  onChange={(e) => {
                    setPassengerData((prev) => ({
                      ...prev,
                      [item.key]: e.target.value.trim(),
                    }));
                  }}
                  className='block px-2.5 pb-2.5 pt-8 w-full h-full text-sm rounded-lg border border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  required
                >
                  {item.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={item.type}
                  id={`floating_${item.key}_${elem}`}
                  onChange={(e) => {
                    if (item.type === 'file') {
                      setPassengerData((prev) => ({
                        ...prev,
                        [item.key]: e.target.files[0],
                      }));
                    } else
                      setPassengerData((prev) => ({
                        ...prev,
                        [item.key]: e.target.value.trim(),
                      }));
                  }}
                  className='block px-2.5 pb-2.5 pt-8 w-full h-full text-sm rounded-lg border border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  required
                />
              )}{' '}
              <label
                htmlFor={`floating_${item.key}_${elem}`}
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 left-1'
              >
                {item.label}
                {item.mandatory ? <span className='text-red-500'>*</span> : null}
              </label>
              {/* {}warnings[item.key] && (
                <p className='absolute text-red-500 text-xs md:text-sm top-full'>{warnings[item.key]}</p>
              )} */}
            </div>
          ))}
          <div className='w-full flex flex-wrap'>
            {radiobtns.map((item) => (
              <div className='relative my-4 w-full lg:w-[49%]' key={item.key}>
                <CheckRadioButton
                  key={item.key}
                  name={`hero-radio-${item.key}_${elem}`}
                  label={item.label}
                  type={'checkbox'}
                  isChecked={passengerData[item.key] === item.value}
                  handleChange={(e) => {
                    setPassengerData((prev) => {
                      const tempData = { ...prev };
                      if (!prev[item.key]) {
                        tempData = { ...tempData, [item.key]: item.value };
                      } else delete tempData[item.key];
                      console.log(tempData);
                      return { ...tempData };
                    });
                  }}
                  wrapperClasses={'mx-3 book-flight-radio'}
                />
              </div>
            ))}
          </div>
          <div className='flex items-center w-full'>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowData(false);
                btnEnabled && submit(passengerData);
              }}
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
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDetails;
