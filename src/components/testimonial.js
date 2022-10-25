const Testimonial = ({ data }) => {
  return (
    <div className='testimonial-card flex z-[2] flex-col md:flex-row rounded-xl p-9 lg:mb-10 my-3 px-9 py-6 md:items-start'>
      <img className='lg:mt-1 mt-4 relative' width='30' src='/images/testimonial-quotes.svg' alt='testimonial-quotes' />
      <div className='flex relative z-[2] lg:w-80 w-100 flex-col justify-center items-start ml-5'>
        <p className='font-medium text-base mb-5 my-4'>{data.text}</p>
        <div className='flex w-100 items-center'>
          <div className='flex flex-col items-start'>
            <p className='font-semibold text-sm'>{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
