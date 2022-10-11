import Image from 'next/image';
import myLoader from '../../loader';

const Footer = () => {
  return (
    <footer className='w-full  bg-zinc-500 flex justify-center py-16 px-4'>
      <div className='w-full max-w-screen-xl flex flex-col items-center '>
        <div className='w-full flex flex-wrap justify-between items-center'>
          <Image loader={myLoader} src={'/images/logo.png'} alt={'avon'} width={120} height={50} />
          <div className='flex items-center  my-4'>
            <Image loader={myLoader} src={'/images/iata.svg'} alt={'iata'} />
            <p className='text-white text-lg font-bold mt-4 ml-2'> WE ARE AN IATA CERTIFIED TRAVEL AGENCY</p>
          </div>
        </div>
        <div className='flex flex-wrap w-full my-12'>
          <div className='flex flex-col w-1/2 lg:w-1/3'>
            <p className='text-white font-semibold text-lg mb-2'>About Us</p>
            <p className='text-gray-300 my-2'>About</p>
            <p className='text-gray-300 mb-2'>Contact Us</p>
            <p className='text-gray-300'>Bank Details</p>
          </div>
          <div className='flex flex-col w-1/2 lg:w-1/3'>
            <p className='text-white font-semibold text-lg mb-2'>About Us</p>
            <p className='text-gray-300 my-2'>About</p>
            <p className='text-gray-300 mb-2'>Contact Us</p>
            <p className='text-gray-300'>Bank Details</p>
          </div>
          <div className='flex flex-col w-1/2 lg:w-1/3 my-12 lg:my-0'>
            <p className='text-white font-semibold text-lg mb-2'>About Us</p>
            <p className='text-gray-300 my-2'>About</p>
            <p className='text-gray-300 mb-2'>Contact Us</p>
            <p className='text-gray-300'>Bank Details</p>
          </div>
        </div>
        <div className='border-t-2 py-2 xl:py-4 text-left border-b-2 w-full border-y-white flex flex-col xl:flex-row xl:flex-wrap items-center justify-between text-white font-bold  text-lg'>
          <p className='w-full xl:w-52'>
            Avon Travels,
            <br />
            <span className='text-base font-normal'> Barnala Road, Nihal Singh Wala, Distt Moga 142055</span>
          </p>
          <p className='my-4 xl:my-0 w-full xl:w-max'>Phone: 9855555721</p>
          <p className='w-full xl:w-max'> info@avontravels.com</p>
        </div>
        <p className='w-full text-center text-sm text-white mt-8'>
          ©{new Date().getFullYear()}Avon Travles Pvt Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
