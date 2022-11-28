import Image from 'next/image';
import { useRef, useState } from 'react';
import myLoader from '../../loader';

const CustomRadioButton = ({ name, type, label, value, isChecked, handleChange }) => {
  return (
    <div>
      <input
        type={type}
        className='custom-radio circle-fill'
        name={name}
        id={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
    </div>
  );
};

const TravelInputRow = ({ dataKey, onChange, value, disableIncrease }) => {
  console.log(disableIncrease);
  return (
    <div className='flex justify-between bg-white my-2'>
      <span className='bg-white capitalize '>Select {dataKey}</span>
      <div className='flex bg-blue-100 text-center'>
        {' '}
        <button
          className='w-4 h-full bg-blue-900 text-white text-center'
          onClick={(e) => {
            e.preventDefault();
            value > 0 && onChange(value - 1);
          }}
        >
          -
        </button>{' '}
        <span className='w-8'>{value}</span>
        <button
          className={`w-4 h-full ${disableIncrease ? 'bg-gray-400' : 'bg-blue-900'} text-white text-center`}
          disabled={disableIncrease}
          onClick={(e) => {
            e.preventDefault();
            onChange(value + 1);
          }}
        >
          +
        </button>{' '}
      </div>
    </div>
  );
};

const TravellerInput = ({ value, onChange, img, width, hideFlightType, max, dropdownClasses }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const wrapperRef = useRef();
  const travellerCount = Object.values(value.travellers).reduce((sum, currVal) => sum + currVal, 0);

  return (
    <div className={`${width || 'w-full lg:w-1/4'} px-2 mb-2 lg:mb-0`}>
      <div
        className='flex items-center bg-slate-100 w-full rounded p-2  relative z-0'
        onClick={(e) => (!showDropDown || e.target === wrapperRef.current) && setShowDropDown((prev) => !prev)}
        ref={wrapperRef}
      >
        <div className={' block w-6 h-6 lg:w-8 lg:h-8'}>
          <Image loader={myLoader} src={img} width={32} height={32} layout={'responsive'} alt={'svg'} />
        </div>
        <span className='capitalize text-sm text-zinc-800 ml-2 text-center pointer-events-none '>
          {travellerCount} Traveller{travellerCount > 1 ? 's' : ''}
          {!hideFlightType && `, ${value.type}`}
        </span>
        {showDropDown && (
          <>
            <aside
              className={`absolute z-20 top-full left-0 bg-white rounded w-full flex flex-col text-black font-medium py-2 px-4 ${dropdownClasses} `}
            >
              {['adults', 'children', 'infants'].map((each) => (
                <TravelInputRow
                  value={value.travellers[each]}
                  key={each}
                  dataKey={each}
                  disableIncrease={max ? max <= travellerCount : false}
                  onChange={(val) => onChange({ ...value, travellers: { ...value.travellers, [each]: val } })}
                />
              ))}

              {!hideFlightType &&
                ['Economy Class', 'Business Class', 'First Class'].map((each) => (
                  <CustomRadioButton
                    key={each}
                    type={'radio'}
                    name={`traveller-type-${each}`}
                    label={each}
                    isChecked={value.type === each}
                    handleChange={() => {
                      onChange({ ...value, type: each });
                    }}
                  />
                ))}
            </aside>
            <div className='w-screen h-screen fixed top-0 left-0 z-10 ' onClick={() => setShowDropDown(false)}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default TravellerInput;
