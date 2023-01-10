import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import myLoader from '../../loader';
import { fileSizeOneMb } from '../../utils/validaitons';
import CheckRadioButton from './checkRadioInputs';

const passengerInputs = [
  {
    label: 'Title',
    mandatory: true,
    type: 'dropdown',
    key: 'title',
    options: ['Mr', 'Mrs', 'Ms'],
  },
  {
    label: 'Last Name',
    mandatory: true,
    type: 'text',
    key: 'lastnamep',
  },
  {
    label: 'First Name',
    mandatory: true,
    type: 'text',
    key: 'firstnamep',
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
    label: 'Email',
    mandatory: true,
    type: 'text',
    key: 'emailp',
  },
  {
    label: 'Nationality',
    mandatory: true,
    type: 'text',
    key: 'nationality',
  },
  {
    label: 'Passport No.',
    mandatory: true,
    type: 'text',
    key: 'passportnop',
  },
  {
    label: 'Passport Issue Place',
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
    mandatory: false,
    type: 'file',
    key: 'passportpicbackp',
  },
  {
    label: 'Visa (Max Size: 1MB)',
    mandatory: false,
    type: 'file',
    key: 'visa',
  },
  {
    label: 'Pan Card (Max Size: 1MB)',
    mandatory: false,
    type: 'file',
    key: 'pancard',
  },
];

const radiobtns = [
  {
    label: 'AVML(Vegetarian Meal)',
    type: 'checkbox',
    key: 'ssravml',
    value: 'AVML',
  },
  {
    label: 'HNML(Non-Vegetarian Meal)',
    type: 'checkbox',
    key: 'ssrhnml',
    value: 'HNML',
  },
  {
    label: 'VGML(Vegan Meal) ',
    type: 'checkbox',
    key: 'ssrvgml',
    value: 'VGML',
  },
  {
    label: 'WCHR (Wheelchair Assistance)',
    type: 'checkbox',
    key: 'ssrwchr',
    value: 'WCHR',
  },
];

const PassengerDetails = ({ elem, showPassengerNumber, submit, openOnMount, type }) => {
  const [showData, setShowData] = useState(false);
  const [passengerData, setPassengerData] = useState({
    title: 'Mr',
    firstnamep: '',
    lastnamep: '',
    genderp: 'Male',
    typep: type,
    dobp: '',
    mobilep: '',
    emailp: '',
    nationality: '',
    passportnop: '',
    passportplace: '',
    passportpicfrontp: '',
    passportpicbackp: '',
    visa: '',
    pancard: '',
  });
  const [fileName, setFileName] = useState({
    passportpicfrontp: undefined,
    passportpicbackp: undefined,
    visa: undefined,
    pancard: undefined,
  });
  const [btnEnabled, setBtnEnabled] = useState(false);
  useEffect(() => {
    const mandatoryKeys = passengerInputs.reduce((acc, item) => (item.mandatory ? [...acc, item.key] : acc), []);
    const inputValid = mandatoryKeys.reduce((result, key) => result && !!passengerData[key], true);
    submit(Object.fromEntries(Object.entries(passengerData).filter(([_, v]) => v)), inputValid);
  }, [passengerData]);
  useEffect(() => {
    if (openOnMount) setShowData(true);
  }, []);
  return (
    <div key={elem} className='w-full' data-accordion='collapse'>
      <h2 className='  border border-gray-900 rounded'>
        <button
          type='button'
          onClick={() => setShowData((prev) => !prev)}
          className='flex items-center justify-between w-full p-5 font-medium text-left'
        >
          <span className='capitalize'>
            Passenger{showPassengerNumber ? ' ' + (elem + 1) : ''} {type} Details
          </span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 ${showData && 'rotate-180'} shrink-0`}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      </h2>
      {showData && (
        <div className='flex flex-col px-4 lg:flex-row lg:flex-wrap lg:gap-x-4 gap-2 border border-t-0 border-gray-400 rounded py-4'>
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
                  value={passengerData[item.key]}
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
              ) : item.type === 'file' && fileName[item.key] ? (
                <p className='flex px-2.5 pb-2.5 pt-8 w-full h-full text-sm rounded-lg border border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'>
                  <span>{fileName[item.key]}</span>
                  <div
                    className='flex items-center mx-4 cursor-pointer'
                    onClick={() => {
                      [setFileName, setPassengerData].forEach((func) =>
                        func((prev) => ({
                          ...prev,
                          [item.key]: null,
                        }))
                      );
                    }}
                  >
                    <Image loader={myLoader} width={'16'} height={'16'} src='/images/close.svg' alt='close icon' />
                  </div>
                </p>
              ) : (
                <input
                  type={item.type}
                  id={`floating_${item.key}_${elem}`}
                  value={item.type === 'file' ? fileName[item.key] : passengerData[item.key]}
                  onChange={(e) => {
                    if (item.type === 'file') {
                      console.log(e.target.files[0]);
                      if (!fileSizeOneMb(e.target.files[0])) {
                        toast.warn(`${item.label} file size should not be more than 1 MB`, {
                          position: 'top-center',
                          autoClose: 3000,
                        });
                        return;
                      } else {
                        setFileName((prev) => ({
                          ...prev,
                          [item.key]: e.target.files[0].name,
                        }));
                        setPassengerData((prev) => ({
                          ...prev,
                          [item.key]: e.target.files[0],
                        }));
                      }
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
          <div className='w-full flex flex-col margin-y2'>
            <span className='font-medium text-xl'>Special Service Requests:</span>
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
          </div>
          {/* <div className='flex items-center w-full'>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowData(false);
                btnEnabled && submit(Object.fromEntries(Object.entries(passengerData).filter(([_, v]) => v)));
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PassengerDetails;
