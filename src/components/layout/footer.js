import Image from 'next/image';
import myLoader from '../../loader';

const Footer = () => {
  return (
    <footer className='w-full  bg-zinc-500 flex justify-center py-16 px-4'>
      <div className='w-full max-w-screen-xl flex flex-col items-center '>
        <div className='w-full flex flex-wrap justify-between items-center'>
          <div className='block w-[150px] lg:w-[200px] max-w overflow-hidden'>
            <Image
              loader={myLoader}
              layout={'responsive'}
              src={'/images/logo.png'}
              alt={'avon'}
              width={120}
              height={50}
            />
          </div>
          <div className='w-full lg:w-1/3 my-4 justify-between flex items-center'>
            <div className='block mx-2'>
              <Image loader={myLoader} src={'/images/taai.svg'} alt={'taai'} width={84} height={74} />
            </div>
            <div className='block w-[175px] lg:w-[200px] mx-4 my-4 '>
              <Image
                loader={myLoader}
                layout={'responsive'}
                src={'/images/ptaa.jpeg'}
                alt={'ptaa'}
                width={250}
                height={100}
              />
            </div>
          </div>
          <div className='flex items-center '>
            <div className='block'>
              <Image loader={myLoader} src={'/images/iata.svg'} alt={'iata'} width={82} height={50} />
            </div>
            <p className='text-white text-base lg:text-lg font-bold mt-4 ml-2'>
              {' '}
              WE ARE AN IATA CERTIFIED TRAVEL AGENCY
            </p>
          </div>
        </div>
        <div className='border-t-2 py-4 mt-12 text-left border-b-2 w-full border-y-white flex flex-col xl:flex-row xl:flex-wrap items-center justify-between text-white font-bold  text-lg'>
          <a href={'https://goo.gl/maps/eqbLdy89RgrW6EmTA'} className='hover:text-primary-yellow w-full xl:w-52'>
            Avon Travels,
            <br />
            <span className='text-base font-normal'> Barnala Road, Nihal Singh Wala, Distt Moga 142055</span>
          </a>
          <a className='my-4 xl:my-0 w-full xl:w-max hover:text-primary-yellow' href='tel:+919855555721'>
            Phone: 9855555721
          </a>
          <a className='w-full xl:w-max hover:text-primary-yellow' href='mailto:info@avontravels.com'>
            {' '}
            info@avontravels.com
          </a>
        </div>
        <p className='w-full text-center text-sm text-white mt-8'>
          ©{new Date().getFullYear()} Avon Travles Pvt Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
