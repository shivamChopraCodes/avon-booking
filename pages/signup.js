import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    const allInputs = Object.values(formData).reduce((acc, currVal) => (!acc ? acc : !!currVal), true);
    if (allInputs) {
      setBtnDisabled(formData.confirmPassword !== formData.password);
    } else setBtnDisabled(true);
  }, [formData]);
  useEffect(() => {
    console.log(btnDisabled);
  }, [btnDisabled]);

  return (
    <div className='block mx-auto my-20 p-6 rounded-lg shadow-lg bg-white max-w-md'>
      <p className='font-old text-2xl mb-6'> Sign Up</p>
      <form>
        <div className='grid grid-cols-2 gap-4'>
          <div className='form-group mb-6'>
            <input
              type='text'
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value.trim() }))}
              className='form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              id='exampleInput123'
              aria-describedby='emailHelp123'
              placeholder='First name'
            />
          </div>
          <div className='form-group mb-6'>
            <input
              type='text'
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value.trim() }))}
              className='form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              id='exampleInput124'
              aria-describedby='emailHelp124'
              placeholder='Last name'
            />
          </div>
        </div>
        <div className='form-group mb-6'>
          <input
            type='email'
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value.trim() }))}
            className='form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            id='exampleInput125'
            placeholder='Email address'
          />
        </div>
        <div className='form-group mb-6'>
          <input
            type='password'
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            className='form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        roundedƒ
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            id='exampleInput126'
            placeholder='Password'
          />
        </div>
        <div className='form-group mb-6'>
          <input
            type='password'
            value={formData.confirmPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            className='form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        roundedƒ
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            id='exampleInput127'
            placeholder='Confirm Password'
          />
        </div>
        <div className='flex items-center'>
          <button
            type='submit'
            className={`
      px-6
      py-2.5
    ${btnDisabled ? 'bg-slate-300 cursor-not-allowed' : ' color-transition  button'}
      font-medium
      text-xs text-white 
      leading-tight
      uppercase
      rounded
      shadow-md`}
            disabled={btnDisabled}
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
