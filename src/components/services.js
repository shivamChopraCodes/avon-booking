const Services = () => {
  return (
    <div className='flex flex-wrap max-w-screen-xl justify-center items-center mx-auto'>
      <div className='w-full flex flex-col  py-4 lg:w-[22%] mx-2 text-center lg:text-left my-4 xl:my-0 '>
        <p className='text-zinc-500 font-semibold text-base'>How it works</p>
        <p className='text-primary-blue font-bold text-2xl'>Amazing Deals Best Prices</p>
        <p className='text-black font-bold text-xs'>Search & Book in 3 Simple Steps</p>
      </div>
      <div className='w-full flex flex-col items-center py-12 md:w-[30%] lg:w-[22%] mx-2  rounded border border-gray-100 shadow-xl'>
        <img src={'/images/services01.svg'} alt={'service'} />
        <p className='text-black font-semibold'>Select your flight </p>
        <p className='text-zinc-500 text-base'>& tell us your preference</p>
      </div>
      <div className='w-full flex flex-col items-center py-12 md:w-[30%] lg:w-[22%] mx-2  rounded border border-gray-100 shadow-xl'>
        <img src={'/images/services02.svg'} alt={'service'} />
        <p className='text-black font-semibold'>Select your flight </p>
        <p className='text-zinc-500 text-base'>& tell us your preference</p>
      </div>
      <div className='w-full flex flex-col items-center py-12 md:w-[30%] lg:w-[22%] mx-2  rounded border border-gray-100 shadow-xl'>
        <img src={'/images/services03.svg'} alt={'service'} />
        <p className='text-black font-semibold'>Select your flight </p>
        <p className='text-zinc-500 text-base'>& tell us your preference</p>
      </div>
    </div>
  );
};

export default Services;
