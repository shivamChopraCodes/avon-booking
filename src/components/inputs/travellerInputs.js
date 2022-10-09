import { useRef, useState } from 'react';

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

const TravelInputRow = ({ dataKey, onChange, value }) => {
  return (
    <div className='flex justify-between bg-white my-2'>
      <span className='bg-white capitalize '>Select {dataKey}</span>
      <div className='flex bg-blue-100 text-center'>
        {' '}
        <button
          className='w-4 h-full bg-blue-900 text-white text-center'
          onClick={() => value > 0 && onChange(value - 1)}
        >
          -
        </button>{' '}
        <span className='w-8'>{value}</span>
        <button className='w-4 h-full bg-blue-900 text-white text-center' onClick={(e) => onChange(value + 1)}>
          +
        </button>{' '}
      </div>
    </div>
  );
};

const TravellerInput = ({ value, onChange, img }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const wrapperRef = useRef();
  const travellerCount = Object.values(value.travellers).reduce((sum, currVal) => sum + currVal, 0);
  console.log(value);
  return (
    <div
      className='flex items-center bg-slate-100 w-full lg:w-1/5 rounded p-2 mb-2 lg:mr-2 lg:mb-0 relative z-0'
      onClick={(e) => (!showDropDown || e.target === wrapperRef.current) && setShowDropDown((prev) => !prev)}
      ref={wrapperRef}
    >
      <img src={img} className={'w-6 h-6 lg:w-8 lg:h-8'} width={32} height={32} alt={'svg'} />
      <span className='capitalize text-sm text-zinc-800 ml-2 text-center pointer-events-none '>
        {travellerCount} Traveller{travellerCount > 1 ? 's' : ''}, {value.type}
      </span>
      {showDropDown && (
        <>
          <aside className='absolute z-20 top-full left-0 bg-white rounded w-full flex flex-col text-black font-medium py-2 px-4'>
            {['adults', 'children', 'infants'].map((each) => (
              <TravelInputRow
                value={value.travellers[each]}
                key={each}
                dataKey={each}
                onChange={(val) => onChange({ ...value, travellers: { ...value.travellers, [each]: val } })}
              />
            ))}

            {['economy', 'business', 'first class'].map((each) => (
              <CustomRadioButton
                key={each}
                type={'radio'}
                name={`traveller-type-${each}`}
                label={each}
                isChecked={value.type === each}
                handleChange={() => {
                  console.log(each);
                  onChange({ ...value, type: each });
                }}
              />
            ))}
          </aside>
          <div className='w-screen h-screen fixed top-0 left-0 z-10 ' onClick={() => setShowDropDown(false)}></div>
        </>
      )}
    </div>
  );
};

export default TravellerInput;
