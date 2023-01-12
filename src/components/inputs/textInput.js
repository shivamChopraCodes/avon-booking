import Image from 'next/image';
import { useState } from 'react';
import myLoader from '../../loader';

const TextSearchInput = ({ placeholder, value, onChange, img, width, options }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className={`w-full ${width || 'lg:w-1/6'} my-2 lg:mt-0 lg:my-0 lg:mb-0 px-2`}>
      <div className={`flex bg-slate-100 w-full z-[${placeholder === 'Origin' ? 2 : 1}] relative rounded p-2`}>
        <div className={'w-6 h-6 lg:w-8 lg:h-8 block'}>
          <Image loader={myLoader} src={img} layout={'responsive'} width={32} height={32} alt={'svg'} />
        </div>
        <input
          className='bg-transparent border-0 focus:outline-0 text-sm text-zinc-800 ml-2 w-full'
          type={'text'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowOptions(true)}
          onBlur={() => {
            const matches = options.find((option) => value === option.cityname);
            if (!matches) onChange('');
          }}
        />
        {showOptions && (
          <>
            <div className='w-full bg-white shadow-xl absolute top-full left-0 flex flex-col max-h-96 overflow-y-auto z-20'>
              {(value
                ? options.filter((option) => option.cityname.toLowerCase().includes(value.toLowerCase()))
                : options
              ).map((option) => (
                <div
                  key={option.cityname}
                  className='flex flex-col cursor-pointer w-full border-b p-2 border-slate-400 justify-center '
                  onClick={() => {
                    onChange(option.cityname);
                    setShowOptions(false);
                  }}
                >
                  <p className='font-bold text-sm'>{option.cityname}</p>
                  <p className='text-xs text-slate-600'>{option.countryname}</p>
                </div>
              ))}
            </div>
            <div className='w-screen h-screen fixed top-0 left-0 z-10 ' onClick={() => setShowOptions(false)}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default TextSearchInput;
