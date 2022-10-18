import Image from 'next/image';
import { useRef } from 'react';
import myLoader from '../../loader';

const DatePicker = ({ placeholder, value, onChange, img, returnPlaceHolder, returnValue, onReturnChange, width }) => {
  return (
    <div className={`w-full ${'lg:w-1/4 '} px-2 mb-2 lg:mb-0`}>
      <div className='flex relative bg-slate-100 w-full rounded p-2'>
        <Image loader={myLoader} src={img} className={'w-6 h-6 lg:w-8 lg:h-8'} width={32} height={32} alt={'svg'} />
        <input
          className={`bg-transparent border-0 w-full focus:outline-0 text-sm text-zinc-800 ml-2 `}
          type={'text'}
          name='daterange'
          onFocus={() =>
            $('input[name="daterange"]').daterangepicker({
              singleDatePicker: !returnPlaceHolder,
              minDate: new Date(),
              showDropdowns: true,
              locale: {
                format: 'DD/MM/YYYY',
              },
            })
          }
          placeholder={placeholder + (returnPlaceHolder ? '    ' + returnPlaceHolder : '')}
          value={value}
          readOnly
        />
      </div>
    </div>
  );
};

export default DatePicker;
