import Image from 'next/image';
import myLoader from '../../loader';

const TextSearchInput = ({ placeholder, value, onChange, img, width }) => {
  return (
    <div className={`w-full ${width === 'small' ? 'lg:w-1/4' : 'lg:w-1/6'} mb-2 px-2  `}>
      <div className={`flex bg-slate-100 w-full  rounded p-2`}>
        <div className={'w-6 h-6 lg:w-8 lg:h-8 block'}>
          <Image loader={myLoader} src={img} layout={'responsive'} width={32} height={32} alt={'svg'} />
        </div>
        <input
          className='bg-transparent border-0 focus:outline-0 text-sm text-zinc-800 ml-2'
          type={'text'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextSearchInput;
