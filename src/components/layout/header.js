import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import myLoader from '../../loader';

const Header = () => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  return (
    <>
      <div className='header backdrop-blur-lg text-primary-blue font-semibold w-full z-40  flex justify-between items-center absolute top-4 left-0 px-12 '>
        <a href={'./index.html'}>
          <div className='block cursor-pointer w-[150px] lg:w-[200px] max-w overflow-hidden'>
            <Image
              loader={myLoader}
              layout={'responsive'}
              src={'/images/logo.png'}
              alt={'avon'}
              width={120}
              height={50}
            />
          </div>
        </a>
        <div className='lg:flex items-center h-full hidden '>
          <a href={'#about-us'} className='cursor-pointer mx-4 hover:text-primary-yellow'>
            About
          </a>
          <a href={'#services'} className='cursor-pointer mx-4 hover:text-primary-yellow'>
            Services
          </a>
          <a href={'#contact-us'} className='cursor-pointer mx-4 hover:text-primary-yellow'>
            Contact Us
          </a>
          <div
            className={`hover-yellow cursor-pointer rounded-lg flex items-center py-2 pl-2 bg-gradient-to-r from-yellow-300 to-primary-yellow hover:text-white dropdown-toggle ${
              showLoginMenu && 'dropdown-toggle-on'
            } relative pr-10`}
            onClick={() => setShowLoginMenu((prev) => !prev)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 48 48'>
              <path
                className='hover-fill'
                d='M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm0 28.4c-5.01 0-9.41-2.56-12-6.44.05-3.97 8.01-6.16 12-6.16s11.94 2.19 12 6.16c-2.59 3.88-6.99 6.44-12 6.44z'
                fill='#002d5b'
              />
              <path d='M0 0h48v48h-48z' fill='none' />
            </svg>
            <span className='ml-1'>Account</span>
            {showLoginMenu && (
              <div className='absolute rounded shadow-2xl w-full top-[110%] bg-white flex flex-col text-slate-800 px-4 py-2 z-20'>
                <a href={'/signin'} className='cursor-pointer hover:text-primary-yellow my-2'>
                  Login
                </a>

                <a href={'/signup'} className='cursor-pointer hover:text-primary-yellow my-2'>
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {showLoginMenu && (
        <div className='w-screen h-screen fixed top-0 left-0 z-10 ' onClick={() => setShowLoginMenu(false)}></div>
      )}
    </>
  );
};

export default Header;
