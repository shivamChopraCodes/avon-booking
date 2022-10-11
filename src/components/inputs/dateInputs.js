import Image from 'next/image';
import { useRef } from 'react';
import myLoader from '../../loader';

const DatePicker = ({ placeholder, value, onChange, img, returnPlaceHolder, returnValue, onReturnChange }) => {
  const inputRef = useRef();
  const returnRef = useRef();
  return (
    <div className='flex relative bg-slate-100 w-full lg:w-1/4 rounded p-2 mb-2 lg:mb-0  lg:mr-2'>
      <Image loader={myLoader} src={img} className={'w-6 h-6 lg:w-8 lg:h-8'} width={32} height={32} alt={'svg'} />
      <input
        className='bg-transparent border-0 w-1/3 focus:outline-0 text-sm text-zinc-800 ml-2 '
        type={'text'}
        ref={inputRef}
        onFocus={() => (inputRef.current.type = 'date')}
        onBlur={() => (!value ? (inputRef.current.type = 'text') : null)}
        placeholder={placeholder}
        value={value}
        min={new Date().toISOString().split('T')[0]}
        onChange={(e) => onChange(e.target.value)}
      />
      {returnPlaceHolder && (
        <input
          className='bg-transparent border-0 w-1/3  focus:outline-0 text-sm text-zinc-800 '
          type={'text'}
          ref={returnRef}
          onFocus={() => (returnRef.current.type = 'date')}
          onBlur={() => (!returnValue ? (returnRef.current.type = 'text') : null)}
          placeholder={returnPlaceHolder}
          value={returnValue}
          onChange={(e) => onReturnChange(e.target.value)}
          min={value ? new Date(value).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
        />
      )}
    </div>
  );
};

export default DatePicker;
