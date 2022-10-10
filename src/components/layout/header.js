import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='header backdrop-blur-lg text-white font-semibold w-full z-40  flex justify-between items-center absolute top-8 left-0 px-8 lg:px-36 '>
      <Image src={'/images/logo.png'} alt={'avon'} width={120} height={50} />
      <div className='lg:flex align-items-center h-full hidden '>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Home</span>
        </Link>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>About</span>
        </Link>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Services</span>
        </Link>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Deal Sheet</span>
        </Link>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Forex</span>
        </Link>
        <Link href={'/'}>
          <span className='cursor-pointer mx-4'>Contact Us</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
