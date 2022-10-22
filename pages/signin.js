import Link from 'next/link';
import { useState } from 'react';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  return (
    <div className='w-full flex justify-center items-center px-2'>
      <div className='block mx-auto my-20 p-6 rounded-lg shadow-lg bg-white max-w-md'>
        <p className='font-old text-2xl mb-6'> Sign In</p>
        <form>
          <div className='form-group mb-6'>
            <label htmlFor='InputEmail1' className='form-label inline-block mb-2 text-gray-700'>
              Email address
            </label>
            <input
              type='email'
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
              id='InputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
          </div>
          <div className='form-group mb-6'>
            <label htmlFor='exampleInputPassword1' className='form-label inline-block mb-2 text-gray-700'>
              Password
            </label>
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
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              id='exampleInputPassword1'
              placeholder='Password'
            />
          </div>
          <div className='form-group form-check mb-6'>
            <input
              type='checkbox'
              className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              id='exampleCheck1'
              checked={formData.rememberMe}
              onChange={(e) => setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}
            />
            <label className='form-check-label inline-block text-gray-800' htmlFor='exampleCheck1'>
              Remember me
            </label>
          </div>
          <div className='flex items-center'>
            <button
              type='submit'
              className='
      px-6
      py-2.5
     color-transition text-white      button
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md'
            >
              Sign In
            </button>
            <p className='text-gray-800 text-center ml-4'>
              Not a member?{' '}
              <a
                href={'/signup'}
                className='cursor-pointer text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
