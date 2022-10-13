import Image from 'next/image';
import myLoader from '../loader';

const services = [
  {
    img: '/images/services01.svg',
    text: 'Air tickets',
    subtext:
      'We provide the tickets at wholesale price which means the price is lesser and affordable  than that of the tickets booked by regular travel agencies.',
  },
  {
    img: '/images/services02.svg',
    text: 'Student Visa',
    subtext:
      'We promise to get you the student VISA done at the most economical  rates without the involment of costly brokerage agents.',
  },
  {
    img: '/images/services03.png',
    text: 'Free IELTS Counseling',
    subtext:
      'We aim in training the students for IELTS so that they turn self sufficient and their dependency on training institutes is decreased.',
  },
  {
    img: '/images/services04.png',
    text: 'Travel Insurance',
    subtext:
      'We care about you and your safety while travelling from one country to the another. So, we have this- Trawell Tag Cover- as our travel insurance partner.',
  },
  {
    img: '/images/services05.png',
    text: 'Remittances',
    subtext:
      'AVON TRAVELS is one of the Agents of MoneyGram USA, Western Union, TransFast Remittance, Xpress Money and Ria Money Transfer, for Inward Money Transfer Services in India.',
  },
];

const Services = () => {
  return (
    <div className='w-full flex flex-col items-center px-4'>
      <div className='flex flex-col  py-4  mx-auto text-center my-4 xl:my-0 '>
        <p className='text-zinc-500 font-semibold text-base'>How it works</p>
        <p className='text-primary-blue font-bold text-2xl'>Our Services</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-6 gap-2 w-full max-w-screen-xl justify-center items-center mx-auto'>
        {services.map((each, i) => (
          <div
            key={each.img}
            data-aos='fade-up'
            className={`
              group w-full md:h-full relative services-card overflow-hidden flex flex-col items-center px-4 py-12 lg:col-span-2  rounded border border-gray-100 shadow-xl
               ${i > 2 ? (i === 3 ? 'lg:col-start-2' : 'lg:col-start-4') : ''}
        `}
          >
            <div className='absolute top-0 left-0 w-6 h-6 flex justify-center items-center'>
              <p className='font-lg'>{i + 1}</p>
            </div>
            <div className='group-hover:-translate-y-6 transition-all block'>
              <Image loader={myLoader} src={each.img} alt={'service'} layout={'fixed'} width={80} height={80} />
            </div>

            <p className='text-black font-semibold mt-6'>{each.text}</p>
            <p className='text-zinc-400 mt-2 text-center group-hover:text-white text-sm'>{each.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
