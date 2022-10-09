import Image from 'next/image';

const TextSearchInput = ({ placeholder, value, onChange, img }) => {
  return (
    <div className='flex bg-slate-100 w-full lg:w-1/6 rounded p-2 mb-2 lg:mb-0  lg:mr-2'>
      <img src={img} className={'w-6 h-6 lg:w-8 lg:h-8'} width={32} height={32} alt={'svg'} />
      <input
        className='bg-transparent border-0 focus:outline-0 text-sm text-zinc-800 ml-2'
        type={'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextSearchInput;
