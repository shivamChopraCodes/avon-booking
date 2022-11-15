import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { serverbase64, toBase64 } from '../binaryConverter';
import myLoader from '../loader';

const DealsData = [
  {
    img: '/images/flight-offer01.png',
    flightImg: '/images/thaiAir.jpeg',
    text: 'Flash Sale! Upto 25% off',
  },
  {
    img: '/images/flight-offer02.png',
    flightImg: '/images/vistara.jpeg',
    text: 'Abu Dhabi to New Delhi',
  },
  {
    img: '/images/flight-offer03.png',
    flightImg: '/images/spicejet.jpeg',
    text: 'New York to New Delhi',
  },
  {
    img: '/images/flight-offer04.png',
    flightImg: '/images/airasia.jpeg',
    text: 'Australia to New Delhi',
  },
  {
    img: '/images/flight-offer05.png',
    flightImg: '/images/6E.jpeg',
    text: 'Australia to New Delhi',
  },
];

const DealSlider = ({ data, logos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (!data) return;
  return (
    <Slider className='w-full' {...settings}>
      {data.map((deal) => (
        <div key={deal.idbesttour} className='flex flex-col relative rounded-xl w-full  z-0 '>
          <div className='absolute top-4 left-3 flex items-center h-8 z-[2] cursor-default bg-white transition-all duration-300 rounded-full overflow-hidden'>
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
          </div>

          <div className='w-full block overflow-hidden  relative '>
            <Image
              loader={myLoader}
              width={300}
              height={235}
              src={`data:image/jpeg;base64,${serverbase64(deal.image.data)}`}
              alt={'deal'}
              layout={'responsive'}
            />
          </div>
          <div className='flex flex-col px-2 py-4 w-full text-center absolute bottom-0  bg-primary-blue bg-opacity-70 '>
            <p className='text-primary-yellow text-xs font-medium'>{deal.text}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default DealSlider;
