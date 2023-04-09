import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import myLoader from '../../loader';
const socials = [
  {
    link: 'https://www.facebook.com/AvonTravelsnsw',
    img: '/images/facebook.svg',
    hoverImg: '/images/facebook-hover.svg',
  },
  { link: 'https://twitter.com/AvonTravels', img: '/images/twitter.svg', hoverImg: '/images/twitter-hover.svg' },
  {
    link: 'https://www.instagram.com/avontravelsnsw/?r=nametag',
    img: '/images/instagram.svg',
    hoverImg: '/images/instagram-hover.svg',
  },
];

const Header = () => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: userData, status: userStatus } = useSession();
  const [hoverImg, setHoverImg] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (showMobileMenu) setShowMobileMenu(false);
    if (showLoginMenu) setShowLoginMenu(false);
  }, [router.asPath]);

  const logout = async () => {
    console.log(userData);
    const {
      user: { userType },
    } = userData;
    console.log(`${userType.toLowerCase() === 'staff' ? '/staff' : ''}/signin`);
    const data = await signOut({ redirect: false });
    if (data) {
      router.push(`${userType.toLowerCase() === 'staff' ? '/staff' : ''}/signin`);
    }
  };

  return (
    <>
      <div
        className={`header backdrop-blur-lg ${
          router.pathname.includes('contact') ? 'text-white' : 'text-primary-blue'
        } font-semibold w-full z-40  absolute top-4 left-0 px-12`}
      >
        <div className='w-full flex justify-between items-center border-b border-gray-400 pb-2'>
          <div className='flex'>
            {socials.map((social, i) => (
              <a
                onMouseEnter={() => setHoverImg(social.hoverImg)}
                onMouseLeave={() => setHoverImg('')}
                className={i == 1 ? 'mx-4' : ''}
                href={social.link}
                rel={'noreferrer'}
                target={'_blank'}
                key={social.link}
              >
                <Image
                  loader={myLoader}
                  src={hoverImg === social.hoverImg ? social.hoverImg : social.img}
                  height={16}
                  width={16}
                  alt={social.img}
                />
              </a>
            ))}
          </div>
        </div>

        <div className='w-full flex justify-between items-center pt-2'>
          <Link href={'/'}>
            <div className='block cursor-pointer w-[150px] lg:w-[200px] max-w overflow-hidden drop-shadow-2xl '>
              <Image
                loader={myLoader}
                layout={'responsive'}
                src={'/images/logo.png'}
                alt={'avon'}
                width={200}
                height={75}
              />
            </div>
          </Link>
          <div className='lg:flex items-center h-full hidden '>
            <Link href={'/about-us'}>
              <span className='cursor-pointer mx-4 hover:text-primary-yellow'>About</span>
            </Link>
            <Link href={'/#services'}>
              <span className='cursor-pointer mx-4 hover:text-primary-yellow'>Services</span>
            </Link>
            <Link href={'/contact-us'}>
              <span className='cursor-pointer mx-4 hover:text-primary-yellow'>Contact Us</span>
            </Link>
            {userStatus === 'authenticated' && (
              <Link href={'/search-flights'}>
                <span className='cursor-pointer mx-4 hover:text-primary-yellow my-4 '>Search Flights</span>
              </Link>
            )}
            <div
              className={`hover-yellow cursor-pointer rounded-lg flex items-center py-2 pl-2 bg-gradient-to-r from-yellow-300 to-primary-yellow hover:text-white dropdown-toggle ${
                showLoginMenu && 'dropdown-toggle-on'
              } relative pr-10 text-primary-blue`}
              onClick={() => setShowLoginMenu((prev) => !prev)}
            >
              {userData?.user?.userType === 'Staff' ? (
                <svg
                  className='hover-fill'
                  fill='#002d5b'
                  height='30px'
                  width='30px'
                  version='1.1'
                  id='Capa_1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 489.327 489.327'
                  stroke='#002d5b'
                  stroke-width='0'
                >
                  <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <g>
                      {' '}
                      <g>
                        {' '}
                        <path d='M476.616,273.213l-9.1-12.6c-7.6-10.4-7.7-24.5-0.3-35.1l8.9-12.7c10.4-14.8,5.5-35.3-10.3-43.9l-13.6-7.4 c-11.3-6.1-17.5-18.8-15.3-31.5l2.6-15.4c3-17.8-10.2-34.3-28.2-35l-15.4-0.7c-12.8-0.5-23.8-9.3-27.4-21.7l-4.3-15 c-5-17.4-24-26.4-40.4-19.2l-14.2,6.2c-11.8,5.1-25.5,2.1-34-7.6l-10.3-11.6c-12-13.5-33-13.3-44.7,0.3l-10.1,11.8 c-8.4,9.7-22,13-33.9,8.1l-14.3-5.9c-16.6-6.9-35.4,2.4-40.2,19.9l-4.1,15c-3.5,12.6-14.4,21.5-27.1,22.2l-15.4,0.9 c-17.9,1-30.9,17.7-27.6,35.4l2.8,15.3c2.3,12.7-3.7,25.5-14.9,31.7l-13.5,7.6c-15.7,8.8-20.2,29.4-9.6,44l9.1,12.6 c7.6,10.4,7.7,24.5,0.3,35.1l-9.1,12.8c-10.4,14.8-5.5,35.3,10.3,43.9l13.6,7.4c11.3,6.1,17.5,18.8,15.3,31.5l-2.5,15.2 c-3,17.8,10.2,34.3,28.2,35l15.4,0.7c12.8,0.5,23.8,9.3,27.4,21.7l4.3,15c5,17.4,24,26.4,40.4,19.2l14.2-6.2 c11.8-5.1,25.5-2.1,34,7.5l10.3,11.6c12,13.5,33,13.3,44.7-0.3l10.1-11.8c8.4-9.7,22-13,33.9-8.1l14.3,5.9 c16.6,6.9,35.4-2.4,40.2-19.9l4.1-15c3.4-12.4,14.3-21.3,27.1-22.1l15.4-0.9c17.9-1,30.9-17.7,27.6-35.5l-2.8-15.3 c-2.3-12.7,3.7-25.5,14.9-31.7l13.5-7.6C482.716,308.513,487.216,287.813,476.616,273.213z M244.616,393.513 c-82.4,0-149.2-67.3-149.2-150.3s66.8-150.4,149.2-150.4s149.2,67.3,149.2,150.3S327.016,393.513,244.616,393.513z'></path>{' '}
                        <path d='M332.316,205.213l-55.8-4.1l-21.1-52.2c-4-9.8-17.8-9.8-21.7,0l-21.1,52.2l-55.8,4.1c-10.5,0.8-14.8,14-6.7,20.8 l42.7,36.3l-13.4,54.7c-2.5,10.3,8.6,18.5,17.6,12.9l47.5-29.7l47.5,29.7c8.9,5.6,20.1-2.6,17.6-12.9l-13.4-54.7l42.7-36.3 C347.116,219.213,342.816,206.013,332.316,205.213z'></path>{' '}
                      </g>{' '}
                    </g>{' '}
                    <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                    <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                  </g>
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 48 48'>
                  <path
                    className='hover-fill'
                    d='M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm0 28.4c-5.01 0-9.41-2.56-12-6.44.05-3.97 8.01-6.16 12-6.16s11.94 2.19 12 6.16c-2.59 3.88-6.99 6.44-12 6.44z'
                    fill='#002d5b'
                  />
                  <path d='M0 0h48v48h-48z' fill='none' />
                </svg>
              )}

              <span className='ml-1'>{userStatus === 'authenticated' ? userData.user.userName : 'Account'}</span>
              {showLoginMenu && (
                <div className='absolute rounded shadow-2xl w-full top-[110%] left-0 bg-white flex flex-col text-slate-800 px-4 py-2 z-20'>
                  {userStatus === 'authenticated' ? (
                    <>
                      <Link href={'/booking-history'}>
                        <span className='cursor-pointer whitespace-nowrap hover:text-primary-yellow my-4 '>
                          Your Bookings
                        </span>
                      </Link>
                      <span onClick={logout} className='cursor-pointer hover:text-primary-yellow my-2'>
                        Logout
                      </span>
                    </>
                  ) : (
                    <>
                      <Link href={'/signin'}>
                        <span className='cursor-pointer hover:text-primary-yellow my-2'>Login</span>
                      </Link>
                      <Link href={'/signup'}>
                        <span className='cursor-pointer hover:text-primary-yellow my-2'>Register</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <button
            type='button'
            className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden '
            aria-controls='navbar-default'
            aria-expanded='false'
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          {showMobileMenu && (
            <div className='absolute left-0 top-full z-20 items-center w-full lg:hidde text-primary-blue '>
              <div className='mx-auto bg-white flex flex-col items-center w-3/4 lg:hidden shadow-lg rounded'>
                <Link href={'/about-us'}>
                  <span className='cursor-pointer mx-4 hover:text-primary-yellow my-4'>About</span>
                </Link>
                <Link href={'/#services'}>
                  <span className='cursor-pointer mx-4 hover:text-primary-yellow my-4 '>Services</span>
                </Link>
                <Link href={'/contact-us'}>
                  <span className='cursor-pointer mx-4 hover:text-primary-yellow my-4'>Contact Us</span>
                </Link>
                {userStatus === 'authenticated' && (
                  <Link href={'/search-flights'}>
                    <span className='cursor-pointer mx-4 hover:text-primary-yellow my-4'>Search Flights</span>
                  </Link>
                )}
                <div
                  className={` my-4 hover-yellow cursor-pointer rounded-lg flex items-center py-2 pl-2 bg-gradient-to-r from-yellow-300 to-primary-yellow hover:text-white dropdown-toggle ${
                    showLoginMenu && 'dropdown-toggle-on'
                  } relative pr-10`}
                  onClick={() => setShowLoginMenu((prev) => !prev)}
                >
                  {userData?.user?.userType === 'Staff' ? (
                    <svg
                      fill='#002d5b'
                      height='30px'
                      width='30px'
                      version='1.1'
                      id='Capa_1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 489.327 489.327'
                      stroke='#002d5b'
                      stroke-width='0'
                    >
                      <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                      <g id='SVGRepo_iconCarrier'>
                        {' '}
                        <g>
                          {' '}
                          <g>
                            {' '}
                            <path d='M476.616,273.213l-9.1-12.6c-7.6-10.4-7.7-24.5-0.3-35.1l8.9-12.7c10.4-14.8,5.5-35.3-10.3-43.9l-13.6-7.4 c-11.3-6.1-17.5-18.8-15.3-31.5l2.6-15.4c3-17.8-10.2-34.3-28.2-35l-15.4-0.7c-12.8-0.5-23.8-9.3-27.4-21.7l-4.3-15 c-5-17.4-24-26.4-40.4-19.2l-14.2,6.2c-11.8,5.1-25.5,2.1-34-7.6l-10.3-11.6c-12-13.5-33-13.3-44.7,0.3l-10.1,11.8 c-8.4,9.7-22,13-33.9,8.1l-14.3-5.9c-16.6-6.9-35.4,2.4-40.2,19.9l-4.1,15c-3.5,12.6-14.4,21.5-27.1,22.2l-15.4,0.9 c-17.9,1-30.9,17.7-27.6,35.4l2.8,15.3c2.3,12.7-3.7,25.5-14.9,31.7l-13.5,7.6c-15.7,8.8-20.2,29.4-9.6,44l9.1,12.6 c7.6,10.4,7.7,24.5,0.3,35.1l-9.1,12.8c-10.4,14.8-5.5,35.3,10.3,43.9l13.6,7.4c11.3,6.1,17.5,18.8,15.3,31.5l-2.5,15.2 c-3,17.8,10.2,34.3,28.2,35l15.4,0.7c12.8,0.5,23.8,9.3,27.4,21.7l4.3,15c5,17.4,24,26.4,40.4,19.2l14.2-6.2 c11.8-5.1,25.5-2.1,34,7.5l10.3,11.6c12,13.5,33,13.3,44.7-0.3l10.1-11.8c8.4-9.7,22-13,33.9-8.1l14.3,5.9 c16.6,6.9,35.4-2.4,40.2-19.9l4.1-15c3.4-12.4,14.3-21.3,27.1-22.1l15.4-0.9c17.9-1,30.9-17.7,27.6-35.5l-2.8-15.3 c-2.3-12.7,3.7-25.5,14.9-31.7l13.5-7.6C482.716,308.513,487.216,287.813,476.616,273.213z M244.616,393.513 c-82.4,0-149.2-67.3-149.2-150.3s66.8-150.4,149.2-150.4s149.2,67.3,149.2,150.3S327.016,393.513,244.616,393.513z'></path>{' '}
                            <path d='M332.316,205.213l-55.8-4.1l-21.1-52.2c-4-9.8-17.8-9.8-21.7,0l-21.1,52.2l-55.8,4.1c-10.5,0.8-14.8,14-6.7,20.8 l42.7,36.3l-13.4,54.7c-2.5,10.3,8.6,18.5,17.6,12.9l47.5-29.7l47.5,29.7c8.9,5.6,20.1-2.6,17.6-12.9l-13.4-54.7l42.7-36.3 C347.116,219.213,342.816,206.013,332.316,205.213z'></path>{' '}
                          </g>{' '}
                        </g>{' '}
                        <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                        <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                      </g>
                    </svg>
                  ) : (
                    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 48 48'>
                      <path
                        className='hover-fill'
                        d='M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm0 28.4c-5.01 0-9.41-2.56-12-6.44.05-3.97 8.01-6.16 12-6.16s11.94 2.19 12 6.16c-2.59 3.88-6.99 6.44-12 6.44z'
                        fill='#002d5b'
                      />
                      <path d='M0 0h48v48h-48z' fill='none' />
                    </svg>
                  )}
                  <span className='ml-1'>{userStatus === 'authenticated' ? userData.user.userName : 'Account'}</span>
                  {showLoginMenu && (
                    <div className='absolute rounded shadow-2xl w-full top-[110%] left-0 bg-white flex flex-col text-slate-800 px-4 py-2 z-20'>
                      {userStatus === 'authenticated' ? (
                        <>
                          <Link href={'/booking-history'}>
                            <span className='cursor-pointer whitespace-nowrap hover:text-primary-yellow my-4 '>
                              Your Bookings
                            </span>
                          </Link>
                          <span onClick={logout} className='cursor-pointer hover:text-primary-yellow my-2'>
                            Logout
                          </span>
                        </>
                      ) : (
                        <>
                          <Link href={'/signin'}>
                            <span className='cursor-pointer hover:text-primary-yellow my-2'>Login</span>
                          </Link>
                          <Link href={'/signup'}>
                            <span className='cursor-pointer hover:text-primary-yellow my-2'>Register</span>
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showLoginMenu && (
        <div className='w-screen h-screen fixed top-0 left-0 z-20 ' onClick={() => setShowLoginMenu(false)}></div>
      )}
      {showMobileMenu && (
        <div className='w-screen h-screen fixed top-0 left-0 z-10 ' onClick={() => setShowMobileMenu(false)}></div>
      )}
    </>
  );
};

export default Header;
