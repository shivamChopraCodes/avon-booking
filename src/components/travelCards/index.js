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
    amount: '80,000',
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
    amount: '80,000',
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
    amount: '80,000',
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
    amount: '80,000',
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
    amount: '80,000',
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
    amount: '80,000',
  },
];

const TravelCards = () => {
  return (
    <div className='w-full flex justify-center items-center flex-wrap px-4 '>
      {cards.map((card) => (
        <div
          key={card.id}
          data-aos='fade-up'
          data-aos-anchor-placement='top-bottom'
          className='flex flex-col w-full md:w-1/3 xl:w-[30%] md:mx-4 my-4 p-4 rounded-xl border border-gray-100 shadow-xl hover:shadow-2xl hover:-mt-4 transition-all duration-500 '
        >
          <div className='flex items-center text-lg lg:text-xl font-bold'>
            <p>
              {card.from}
              <strong className='text-xl'> → </strong>
            </p>{' '}
            <p>{card.to}</p>
          </div>
          <div className='flex w-full justify-between items-center my-2'>
            <div className='flex'>
              <div className='rounded h-8 overflow-hidden block'>
                <Image loader={myLoader} src={card.img} alt={'logo'} width={32} height={32} />
              </div>
              <aside className='flex flex-col text-xs ml-1 font-medium text-left'>
                <p>{card.flight}</p>
                <p>{card.type}</p>
              </aside>
            </div>
            <p className='text-primary-blue flex items-center'>
              <span className='text-slate-400 font-medium text-sm mx-1'>As low as</span>₹{' '}
              <span className='text-primary-blue font-bold'>{card.amount}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelCards;
