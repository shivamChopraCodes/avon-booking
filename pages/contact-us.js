import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import myLoader from '../src/loader';

const submitEnquiry = async (data, callback) => {
  try {
    const res = await fetch(`/api/contact-us`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        createdat: new Date().toLocaleDateString('en-CA'),
      }),
    });
    const response = await res.json();
    if (response.error) {
      toast.error(response.error, {
        position: 'top-center',
        autoClose: 3000,
      });
    } else {
      toast.success(response.message, {
        position: 'top-center',
        autoClose: 3000,
      });
      callback();
    }
  } catch (e) {
    console.log(e);
  }
};

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [saveBtnEnabled, setSaveBtnEnabled] = useState(false);
  useEffect(() => {
    setSaveBtnEnabled(formData.name && formData.email && formData.message);
  }, [formData]);

  return (
    <div className='pt-24 w-full bg-zinc-500' id='contact-us'>
      <section className=' py-8 px-8'>
        <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md bg-gray-300 rounded'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-primary-yellow '>Contact Us</h2>
          <p className='mb-8 lg:mb-16 font-light text-center text-zinc-600 sm:text-xl'>
            Looking for some more info? Let us know.
          </p>
          <form className='space-y-8'>
            <div className='relative'>
              <input
                type='text'
                id='floating_name'
                className='block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value.trim() }))}
                required
              />
              <label
                htmlFor='floating_name'
                className='absolute bg-white text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
              >
                Your name*
              </label>
            </div>
            <div className='relative'>
              <input
                type='email'
                id='floating_email'
                className='block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value.trim() }))}
                required
              />
              <label
                htmlFor='floating_email'
                className='absolute bg-white text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
              >
                Your email*
              </label>
            </div>
            <div className='relative'>
              <input
                type='tel'
                id='floating_phone'
                className='block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value.replace(/[^\d]/g, '').slice(0, 10) }))
                }
                placeholder=' '
              />
              <label
                htmlFor='floating_phone'
                className='absolute bg-white text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
              >
                Your phone number
              </label>
            </div>

            <div>
              <textarea
                id='message'
                rows='6'
                className='block p-2.5 w-full text-sm rounded-lg focus:outline-none focus:border-0'
                placeholder='Leave a comment...'
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value.slice(0, 350) }))}
              ></textarea>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                submitEnquiry(formData, () => setFormData({ name: '', phone: '', email: '', message: '' }));
              }}
              disabled={!saveBtnEnabled}
              className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg b focus:outline-none focus:ring-primary-300 ${
                saveBtnEnabled ? 'color-transition ' : 'bg-gray-600'
              } button`}
            >
              Send message
            </button>
          </form>
        </div>
        <div className='flex flex-col justify-center items-center  bg-gray-300 w-full lg:w-3/4 mx-auto my-8 py-4 rounded'>
          <h2 className='mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-center text-primary-yellow '>
            We Are Here For You
          </h2>
          <p className='mb-8 lg:mb-16 font-medium text-center text-zinc-600 sm:text-xl'>You can reach out to us</p>
          <div className='flex flex-wrap w-full  justify-center items-center'>
            <div className='w-4/5 md:w-auto flex items-center'>
              <div className='block rounded-full w-12 md:w-24 lg:w-32 p-2 md:p-4 bg-white shadow-2xl overflow-hidden '>
                <Image
                  loader={myLoader}
                  src={'/images/enquiry-icon.svg'}
                  layout={'responsive'}
                  width={'118'}
                  height={'118'}
                  alt={'service-icon'}
                />
              </div>
              <div className='flex flex-col ml-4'>
                <p className='text-xl font-bold  '>Write to us</p>
                <a className='text-base text-primary-blue hover:text-primary-yellow' href='mailto:info@avontravels.com'>
                  info@avontravels.com
                </a>
              </div>
            </div>
            <div className='w-4/5 md:w-auto flex items-center my-4 lg:my-0 md:mx-4'>
              <div className='block rounded-full w-12 md:w-24 lg:w-32 p-2 md:p-4 bg-white shadow-2xl overflow-hidden '>
                <Image
                  loader={myLoader}
                  src={'/images/office-hours.svg'}
                  layout={'responsive'}
                  width={'118'}
                  height={'118'}
                  alt={'service-icon'}
                />
              </div>
              <div className='flex flex-col ml-4'>
                <p className='text-xl font-bold  '>Office hours</p>
                <a
                  className='text-base text-primary-blue hover:text-primary-yellow'
                  href={'https://goo.gl/maps/eqbLdy89RgrW6EmTA'}
                >
                  7 days a week <br /> 09:00am to 5:00pm
                </a>
              </div>
            </div>
            <div className='w-4/5 md:w-100 lg:w-auto flex items-center'>
              <div className='block rounded-full w-12 md:w-24 lg:w-32 p-2 md:p-4 bg-white shadow-2xl overflow-hidden '>
                <Image
                  loader={myLoader}
                  src={'/images/customer-care.svg'}
                  layout={'responsive'}
                  width={'118'}
                  height={'118'}
                  alt={'service-icon'}
                />
              </div>
              <div className='flex flex-col ml-4'>
                <p className='text-xl font-bold  '>Call us at</p>
                <a className='text-base text-primary-blue hover:text-primary-yellow' href='tel:+919855555721'>
                  98555 55721
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
