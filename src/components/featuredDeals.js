import Image from 'next/image';
import { serverbase64 } from '../binaryConverter';
import myLoader from '../loader';

const deals = [
  {
    img: '/images/deals01.png',
    flightImg: '/images/thaiAir.jpeg',
    flightText: 'Thai Airlines',
    text: 'London to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: '80,000',
  },
  {
    img: '/images/deals02.png',
    flightImg: '/images/vistara.jpeg',
    flightText: 'Vistara Airlines',
    text: 'Abu Dhabi to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: '80,000',
  },
  {
    img: '/images/deals03.png',
    flightImg: '/images/spicejet.jpeg',
    flightText: 'Spicejet Airlines',
    text: 'New York to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: '80,000',
  },
  {
    img: '/images/deals04.png',
    flightImg: '/images/airasia.jpeg',
    flightText: 'Airasia Airlines',
    text: 'Australia to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: '80,000',
  },
];

const FeaturedDeals = ({ data, logos }) => {
  if (!data) return null;
  return (
    <div className='flex flex-wrap w-full justify-center my-4 px-3'>
      {data.map((deal, i) => (
        <div
          data-aos='fade-zoom-in'
          data-aos-easing='ease-in-back'
          data-aos-delay={`${300 + i * 100}`}
          data-aos-offset='0'
          key={deal.idweeklyspecial}
          className='flex flex-col relative text-left rounded-xl w-full md:w-[45%] lg:w-[22%] md:mx-4 my-4 xl:my-0 lg:mx-2 border
          border-gray-100 shadow-xl z-0 '
        >
          <div className='absolute top-4 left-3 flex items-center h-8 z-[2] cursor-default bg-white transition-all duration-300 rounded-full pr-1 group hover:shadow-[inset_10rem_0_0_0_#002d5b]'>
            <div className='block rounded-full overflow-hidden h-full'>
              <Image
                loader={myLoader}
                width={32}
                height={32}
                src={`data:image/jpeg;base64,${serverbase64(logos[deal?.flightcompany]?.data)}`}
                alt={'service'}
                layout={'fixed'}
              />
            </div>
            <span className='text-xs mx-1 capitalize group-hover:text-white'>{deal.flightcompany}</span>
          </div>
          <div className='max-h-[350px] lg:max-h-[240px] overflow-hidden'>
            <div className='w-full block  transition-all duration-500 hover:scale-125 shine '>
              <Image
                loader={myLoader}
                width={300}
                height={300}
                src={`data:image/jpeg;base64,${serverbase64(deal?.image?.data)}`}
                alt={'deal'}
                layout={'responsive'}
              />
            </div>
          </div>
          <div className='flex flex-col px-2 py-4 color-transition card '>
            <p className='text-lg font-medium text-zinc-800'>
              {deal.departurecity} to {deal.arrivalcity}
            </p>

            <p className='text-xs font-normal text-zinc-600'>
              {deal.trip}, {deal.classtype}
            </p>
            <p className='text-zinc-600 font-medium mt-2'>
              From <span className='text-lg font-bold'> ₹ {deal.price}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedDeals;
