import Image from 'next/image';
import Link from 'next/link';
import myLoader from '../../loader';

const Header = () => {
  return (
    <div className='header backdrop-blur-lg text-white font-semibold w-full z-40  flex justify-between items-center absolute top-4 left-0 px-8 lg:px-36 '>
      <div className='block w-[150px] lg:w-[200px] max-w overflow-hidden'>
        <Image loader={myLoader} layout={'responsive'} src={'/images/logo.png'} alt={'avon'} width={120} height={50} />
      </div>
      <div className='lg:flex align-items-center h-full hidden '>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Home</span>
        </Link>

        <a href={'#about-us'} className='cursor-pointer mx-4'>
          About
        </a>

        <a href={'#services'} className='cursor-pointer mx-4'>
          Services
        </a>

        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Deal Sheet</span>
        </Link>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Forex</span>
        </Link>

        <a href={'#contact-us'} className='cursor-pointer mx-4'>
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Header;
