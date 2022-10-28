import { useState } from 'react';

const data = [
  {
    name: 'Shivani Budhiraja',
    text: 'I took services of Avon Travels to book my flight from Delhi to Berlin and had the best experience of totally professional services . They have definitely taken care of my preferences and responded real time to my questions as well. All procedure was really smooth and and without hassle. Would definitely recommend for upcoming travels of any sort.',
  },
  {
    name: 'Rahila A',
    text: 'Avon Travels is an amazing service that’s run by people always ready to help their clients get to where they need to be. They worked with me throughout the many issues due to the pandemic and helped me get home. I’m very grateful and recommend their service to anyone looking to book a flight.',
  },
  {
    name: 'Vinod Singla',
    text: 'The customer dealing experience I have with Avon travels is very satisfactory. The workers are professional and prompt to offer you the services as per your requirement. Highly recommended if you are looking for various services for your international travel.',
  },
  {
    name: 'Bhavrit Singh',
    text: 'I am in regular touch with Avon travels. They are very professional and supporting. Even in this Corona pandemic they always kept crystal clear business and have given right advice and never raised price of tickets to sky when approximately all other agencies were doing so. I personally recommend everyone to visit them once and rest you ll find by own. I am highly impressed by their client dealings.',
  },
  {
    name: 'Navdeep Grover',
    text: 'A young passionate entrepreneur, Manik is an Amazing person and is very progressional. I got my tickets booked from India to Canada via Mexico and he was very responsive and took care of everything end to end! I certainly recommend using Avon.',
  },
];

const Testimonial = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => {
    if (step < data.length - 1) {
      setStep((prev) => prev + 1);
    }
  };
  const previousStep = () => {
    if (!step) return;
    setStep((prev) => prev - 1);
  };
  return (
    <div className='flex items-center justify-center w-100 relative  pb-10 lg:pb-12 my-4'>
      <div className='testimonial-wrapper flex  md:gap-x-8 gap-x-3 justify-center'>
        <div className='testimonial-text flex flex-col relative md:gap-y-3'>
          <img id='quotes' src='/images/quotes.svg' alt='quotes' />
          <p className='text-sm md:text-lg h-full  text-white flex items-center w-100 pd-r12'>{data[step].text}</p>
          <div className='content-box'>
            <div className=' w-100 text-div mt-8'>
              <p className='text-lg md:text-xl  gradient-text'>{data[step].name}</p>
            </div>
          </div>
        </div>
        <div className='slide-control'>
          <button onClick={previousStep} className='previous text-orange mx-2 mb-4'>
            <img
              className={`rotate-arrow ${!step && 'opacity-50 cursor-not-allowed'} `}
              src='/images/next-arrow.svg'
              alt='next-arrow'
            />
          </button>
          <button onClick={nextStep} className='next'>
            <img
              className={`${step === data.length - 1 && 'opacity-50 cursor-not-allowed'} `}
              src='/images/next-arrow.svg'
              alt='next-arrow'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
