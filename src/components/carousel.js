import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import myLoader from '../loader';
const data = [
  '/images/brands/brand-2.jpg',
  '/images/brands/brand.jpg',
  '/images/brands/brand-26.jpg',
  '/images/brands/brand-25.jpg',
  '/images/brands/brand-24.jpg',
  '/images/brands/brand-23.jpg',
  '/images/brands/brand-22.jpg',
  '/images/brands/brand-20.jpg',
  '/images/brands/brand-19.jpg',
  '/images/brands/brand-18.jpg',
  '/images/brands/brand-17.jpg',
  '/images/brands/brand-16.jpg',
  '/images/brands/brand-15.jpg',
  '/images/brands/brand-14.jpg',
  '/images/brands/brand-13.jpg',
  '/images/brands/brand-12.jpg',
  '/images/brands/brand-11.jpg',
  '/images/brands/brand-10.jpg',
  '/images/brands/brand-9.jpg',
  '/images/brands/brand-8.jpg',
  '/images/brands/brand-6-1.jpg',
  '/images/brands/brand-7.jpg',
  '/images/brands/brand-5.jpg',
  '/images/brands/brand-4.jpg',
  '/images/brands/brand-3.jpg',
  '/images/brands/brand-2.jpg',
  '/images/brands/brand.jpg',
  '/images/brands/brand-26.jpg',
  '/images/brands/brand-25.jpg',
  '/images/brands/brand-24.jpg',
  '/images/brands/brand-23.jpg',
  '/images/brands/brand-22.jpg',
  '/images/brands/brand-20.jpg',
  '/images/brands/brand-19.jpg',
  '/images/brands/brand-18.jpg',
  '/images/brands/brand-17.jpg',
  '/images/brands/brand-16.jpg',
  '/images/brands/brand-15.jpg',
  '/images/brands/brand-14.jpg',
  '/images/brands/brand-13.jpg',
  '/images/brands/brand-12.jpg',
  '/images/brands/brand-11.jpg',
  '/images/brands/brand-10.jpg',
  '/images/brands/brand-9.jpg',
  '/images/brands/brand-8.jpg',
  '/images/brands/brand-6-1.jpg',
  '/images/brands/brand-7.jpg',
  '/images/brands/brand-5.jpg',
  '/images/brands/brand-4.jpg',
  '/images/brands/brand-3.jpg',
  '/images/brands/brand-2.jpg',
  '/images/brands/brand.jpg',
  '/images/brands/brand-26.jpg',
  '/images/brands/brand-25.jpg',
  '/images/brands/brand-24.jpg',
  '/images/brands/brand-23.jpg',
  '/images/brands/brand-22.jpg',
  '/images/brands/brand-20.jpg',
  '/images/brands/brand-19.jpg',
  '/images/brands/brand-18.jpg',
  '/images/brands/brand-17.jpg',
  '/images/brands/brand-16.jpg',
  '/images/brands/brand-15.jpg',
  '/images/brands/brand-14.jpg',
  '/images/brands/brand-13.jpg',
  '/images/brands/brand-12.jpg',
  '/images/brands/brand-11.jpg',
  '/images/brands/brand-10.jpg',
  '/images/brands/brand-9.jpg',
  '/images/brands/brand-8.jpg',
  '/images/brands/brand-6-1.jpg',
  '/images/brands/brand-7.jpg',
  '/images/brands/brand-5.jpg',
  '/images/brands/brand-4.jpg',
  '/images/brands/brand-3.jpg',
  '/images/brands/brand-2.jpg',
  '/images/brands/brand.jpg',
  '/images/brands/brand-26.jpg',
  '/images/brands/brand-25.jpg',
  '/images/brands/brand-24.jpg',
  '/images/brands/brand-23.jpg',
  '/images/brands/brand-22.jpg',
  '/images/brands/brand-20.jpg',
  '/images/brands/brand-19.jpg',
  '/images/brands/brand-18.jpg',
  '/images/brands/brand-17.jpg',
  '/images/brands/brand-16.jpg',
  '/images/brands/brand-15.jpg',
  '/images/brands/brand-14.jpg',
  '/images/brands/brand-13.jpg',
  '/images/brands/brand-12.jpg',
  '/images/brands/brand-11.jpg',
  '/images/brands/brand-10.jpg',
  '/images/brands/brand-9.jpg',
  '/images/brands/brand-8.jpg',
  '/images/brands/brand-6-1.jpg',
  '/images/brands/brand-7.jpg',
  '/images/brands/brand-5.jpg',
  '/images/brands/brand-4.jpg',
  '/images/brands/brand-3.jpg',
  '/images/brands/brand-2.jpg',
  '/images/brands/brand.jpg',
  '/images/brands/brand-26.jpg',
  '/images/brands/brand-25.jpg',
  '/images/brands/brand-24.jpg',
  '/images/brands/brand-23.jpg',
  '/images/brands/brand-22.jpg',
  '/images/brands/brand-20.jpg',
  '/images/brands/brand-19.jpg',
  '/images/brands/brand-18.jpg',
  '/images/brands/brand-17.jpg',
  '/images/brands/brand-16.jpg',
  '/images/brands/brand-15.jpg',
  '/images/brands/brand-14.jpg',
  '/images/brands/brand-13.jpg',
  '/images/brands/brand-12.jpg',
  '/images/brands/brand-11.jpg',
  '/images/brands/brand-10.jpg',
  '/images/brands/brand-9.jpg',
  '/images/brands/brand-8.jpg',
  '/images/brands/brand-6-1.jpg',
  '/images/brands/brand-7.jpg',
  '/images/brands/brand-5.jpg',
  '/images/brands/brand-4.jpg',
  '/images/brands/brand-3.jpg',
  '/images/brands/brand-2.jpg',
  '/images/brands/brand.jpg',
  '/images/brands/brand-26.jpg',
  '/images/brands/brand-25.jpg',
  '/images/brands/brand-24.jpg',
  '/images/brands/brand-23.jpg',
  '/images/brands/brand-22.jpg',
  '/images/brands/brand-20.jpg',
  '/images/brands/brand-19.jpg',
  '/images/brands/brand-18.jpg',
  '/images/brands/brand-17.jpg',
  '/images/brands/brand-16.jpg',
  '/images/brands/brand-15.jpg',
  '/images/brands/brand-14.jpg',
  '/images/brands/brand-13.jpg',
  '/images/brands/brand-12.jpg',
  '/images/brands/brand-11.jpg',
  '/images/brands/brand-10.jpg',
  '/images/brands/brand-9.jpg',
  '/images/brands/brand-8.jpg',
  '/images/brands/brand-6-1.jpg',
  '/images/brands/brand-7.jpg',
  '/images/brands/brand-5.jpg',
  '/images/brands/brand-4.jpg',
  '/images/brands/brand-3.jpg',
];

const CarouselSection = () => {
  const [sliderPercentage, setSliderPercentage] = useState(50);
  useEffect(() => {
    setSliderPercentage(window.screen.width >= 1440 ? 25 : 50);
  }, []);
  return (
    <Carousel
      infiniteLoop
      transitionTime={6000}
      interval={100}
      centerMode={true}
      showIndicators={false}
      centerSlidePercentage={sliderPercentage}
      showStatus={false}
      autoPlay
      swipeable={false}
      selectedItem={2}
      showThumbs={false}
      stopOnHover={true}
    >
      {data.map((item, i) => (
        <div className='px-2 py-1 lg:px-4 lg:py-2' key={`${item}${i % 2 ? 'old' : 'new'}`}>
          <div className='block bottom-shadow rounded-lg overflow-hidden '>
            <Image loader={myLoader} alt='partner' width={220} height={130} layout={'responsive'} src={item} />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselSection;
