import Image from 'next/image';
import myLoader from '../../loader';

const cards = [
  {
    id: 1,
    from: 'Berlin BER',
    to: 'Japan AXT',
    startDate: 'Sun,31/03',
    endDate: 'Thu, 04/04',
    img: '/images/6E.jpeg',
    flight: 'Indigo-Roundtrip',
    type: 'Economy',
    amount: '30,000',
  },
  {
    id: 2,
    from: 'Berlin BER',
    to: 'Japan AXT',
    startDate: 'Sun,31/03',
    endDate: 'Thu, 04/04',
    img: '/images/6E.jpeg',
    flight: 'Indigo-Roundtrip',
    type: 'Economy',
    amount: '30,000',
  },
  {
    id: 3,
    from: 'Berlin BER',
    to: 'Japan AXT',
    startDate: 'Sun,31/03',
    endDate: 'Thu, 04/04',
    img: '/images/6E.jpeg',
    flight: 'Indigo-Roundtrip',
    type: 'Economy',
    amount: '30,000',
  },
  {
    id: 4,
    from: 'Berlin BER',
    to: 'Japan AXT',
    startDate: 'Sun,31/03',
    endDate: 'Thu, 04/04',
    img: '/images/6E.jpeg',
    flight: 'Indigo-Roundtrip',
    type: 'Economy',
    amount: '30,000',
  },
  {
    id: 5,
    from: 'Berlin BER',
    to: 'Japan AXT',
    startDate: 'Sun,31/03',
    endDate: 'Thu, 04/04',
    img: '/images/6E.jpeg',
    flight: 'Indigo-Roundtrip',
    type: 'Economy',
    amount: '30,000',
  },
  {
    id: 6,
    from: 'Berlin BER',
    to: 'Japan AXT',
    startDate: 'Sun,31/03',
    endDate: 'Thu, 04/04',
    img: '/images/6E.jpeg',
    flight: 'Indigo-Roundtrip',
    type: 'Economy',
    amount: '30,000',
  },
];

const TravelCards = () => {
  return (
    <div className='w-full flex justify-center items-center flex-wrap px-4 '>
      {cards.map((card) => (
        <div
          key={card.id}
          className='flex flex-col w-full md:w-1/3 xl:w-[30%] md:mx-4 my-4 p-4 rounded border border-gray-100 shadow-xl hover:-mt-4 transition-all '
        >
          <div className='flex items-center text-lg lg:text-xl font-bold'>
            <p>
              {card.from}
              {'  ->  '}
            </p>{' '}
            <p>{card.to}</p>
          </div>
          <div className='flex my-2'>
            <p className='text-base'>{card.startDate}</p> {'-'} <p className='text-base'>{card.endDate}</p>
          </div>
          <div className='flex w-full justify-between items-center'>
            <div className='flex'>
              <div className='rounded h-8 block'>
                <Image
                  loader={myLoader}
                  src={card.img}
                  alt={'logo'}
                  width={'32px'}
                  height={'32px'}
                  layout={'responsive'}
                />
              </div>
              <aside className='flex flex-col text-xs ml-1 font-medium text-left'>
                <p>{card.flight}</p>
                <p>{card.type}</p>
              </aside>
            </div>
            <p className='text-primary-blue '>
              $ <span className='text-primary-blue font-bold'>{card.amount}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelCards;
