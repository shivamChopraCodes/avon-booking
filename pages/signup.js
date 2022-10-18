import Link from 'next/link';
import { useEffect, useState } from 'react';
/*
                <div class='relative'>
                  <input
                    type='email'
                    id='floating_email'
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_email'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Your email
                  </label>
                </div>
*/
const data = [
  {
    label: 'Username',
    mandatory: true,
    type: 'text',
    key: 'userName',
  },
  {
    label: 'Agency Name',
    mandatory: true,
    type: 'text',
    key: 'agencyName',
  },
  {
    label: 'Agency Address 1',
    mandatory: true,
    type: 'text',
    key: 'agencyAddress1',
  },
  {
    label: 'Agency Address 2',
    mandatory: true,
    type: 'text',
    key: 'agencyAddress2',
  },
  {
    label: 'City/Town',
    mandatory: true,
    type: 'text',
    key: 'city',
  },
  {
    label: 'State',
    mandatory: true,
    type: 'text,',
    key: 'state',
  },
  {
    label: 'PIN',
    mandatory: true,
    type: 'text,',
    key: 'pin',
  },
  {
    label: 'Mobile',
    mandatory: true,
    type: 'tel',
    key: 'phone',
  },
  {
    label: 'Whatsapp Number',
    mandatory: true,
    type: 'tel',
    key: 'whatsappNumber',
  },
  {
    label: 'Email',
    mandatory: true,
    type: 'email',
    key: 'email',
  },
  {
    label: 'Contact Person',
    mandatory: false,
    type: 'text',
    key: 'contactPerson',
  },
  {
    label: 'Designation',
    mandatory: false,
    type: 'text',
    key: 'designation',
  },
  {
    label: 'Pan/Gir Number(Max Size: 1MB)',
    mandatory: true,
    type: 'file',
    key: 'pan_gir_number',
  },
  {
    label: 'Aadhar Card No./Passport (Max Size: 1MB)',
    mandatory: true,
    type: 'file',
    key: 'aadhar_passport',
  },
  {
    label: 'GST Number (Max Size: 1MB)',
    mandatory: false,
    type: 'file',
    key: 'gst_number',
  },
  {
    label: 'Visiting Card',
    mandatory: true,
    type: 'file',
    key: 'visitingCard',
  },
  {
    label: 'Tan Number',
    mandatory: true,
    type: 'file',
    key: 'tanNumber',
  },
  {
    label: 'Password',
    mandatory: true,
    type: 'password',
    key: 'password',
  },
  {
    label: 'Confirm Password',
    mandatory: true,
    type: 'password',
    key: 'confirmPassword',
  },
];

export default function SignUp() {
  const [formData, setFormData] = useState({
    userName: '',
    agencyName: '',
    agencyAddress1: '',
    agencyAddress2: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    contactPerson: '',
    designation: '',
    pan_gir_number: '',
    aadhar_passport: '',
    gst_number: '',
    visitingCard: '',
    tanNumber: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className='block mx-auto my-20 p-6 rounded-lg shadow-lg bg-white max-w-md'>
      <p className='font-old text-2xl mb-6'> Sign Up</p>
      <form>
        {data.map((item) => (
          <div class='relative my-4' key={item.key}>
            <input
              type={item.type}
              id={`floating_${item.key}`}
              className='block px-2.5 pb-2.5 pt-8 w-full text-sm rounded-lg border border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label
              htmlFor={`floating_${item.key}`}
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 left-1'
            >
              {item.label}
              {item.mandatory ? <span className='text-red-500'>*</span> : null}
            </label>
          </div>
        ))}
        <div className='flex items-center'>
          <button
            type='submit'
            className={`
      px-8
      py-4
 color-transition  button
      font-medium
      text-xs text-white 
      leading-tight
      uppercase
      rounded
      shadow-md`}
          >
            Sign Up
          </button>
          <p className='text-gray-800 text-center ml-4'>
            Registered member?{' '}
            <Link href='/signin'>
              <span className='cursor-pointer text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'>
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
