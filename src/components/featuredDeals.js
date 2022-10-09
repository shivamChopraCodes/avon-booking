import Image from 'next/image';

const deals = [
  {
    img: '/images/deals01.png',
    text: 'London to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: 309,
  },
  {
    img: '/images/deals02.png',
    text: 'Abu Dhabi to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: 309,
  },
  {
    img: '/images/deals03.png',
    text: 'New York to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: 309,
  },
  {
    img: '/images/deals04.png',
    text: 'Australia to New Delhi',
    subtext: 'Oneway Trip, Economy',
    amount: 309,
  },
];

const FeaturedDeals = () => {
  return (
    <div className='flex flex-wrap w-full justify-center my-4 px-3'>
      {deals.map((deal) => (
        <div
          key={deal.img}
          className='flex flex-col text-left w-full md:w-[45%] lg:w-[22%] md:mx-4 my-4 xl:my-0 lg:mx-2  rounded border border-gray-100 shadow-xl '
        >
          <div className='max-h-[350px] lg:max-h-[240px] overflow-hidden'>
            <img className='w-full  transition-all duration-500 hover:scale-125 ' src={deal.img} alt={'deal'} />
          </div>
          <div className='flex flex-col px-2 py-4 hover:transition-colors hover:bg-primary-yellow '>
            <p className='text-lg font-medium text-zinc-800'>{deal.text}</p>

            <p className='text-xs font-normal text-zinc-600'>{deal.subtext}</p>
            <p className='text-zinc-600 font-medium mt-2'>
              From <span className='text-lg font-bold'>{deal.amount} USD</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedDeals;
