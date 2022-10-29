import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import myLoader from '../loader';
const data = [
  '/images/brands/brand-2.png',
  '/images/brands/brand.png',
  '/images/brands/brand-26.png',
  '/images/brands/brand-25.png',
  '/images/brands/brand-24.png',
  '/images/brands/brand-23.png',
  '/images/brands/brand-22.png',
  '/images/brands/brand-20.png',
  '/images/brands/brand-19.png',
  '/images/brands/brand-18.png',
  '/images/brands/brand-17.png',
  '/images/brands/brand-16.png',
  '/images/brands/brand-15.png',
  '/images/brands/brand-14.png',
  '/images/brands/brand-13.png',
  '/images/brands/brand-12.png',
  '/images/brands/brand-11.png',
  '/images/brands/brand-10.png',
  '/images/brands/brand-9.png',
  '/images/brands/brand-8.png',
  '/images/brands/brand-6-1.png',
  '/images/brands/brand-7.png',
  '/images/brands/brand-5.png',
  '/images/brands/brand-4.png',
  '/images/brands/brand-3.png',
];

const CarouselSection = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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

  return (
    <Slider {...settings}>
      {data.map((item, i) => (
        <div className='px-2 py-1 lg:px-4 lg:py-2' key={item}>
          <div className='block  rounded-lg overflow-hidden '>
            <Image loader={myLoader} alt='partner' width={150} height={100} layout={'responsive'} src={item} />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselSection;
