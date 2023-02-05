import Link from 'next/link';
import { useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../src/components/spinner';
import { toast } from 'react-toastify';
import Image from 'next/image';
import myLoader from '../src/loader';
const InputToolTip = ({ data }) => {
  return (
    <div className='absolute t-0 bg-white shadow-lg bottom-full z-10  flex flex-col rounded'>
      <div className=' mt-2 password-helper-container px-2.5 py-1.5 relative'>{data}</div>
    </div>
  );
};
const buttonText = {
  email: 'Generate OTP',
  password: 'Change password',
};

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    opt: '',
    password: '',
    confirmPassword: '',
  });
  const [goodPassword, setGoodPasswrd] = useState({
    'minimum 8 length': false,
    '1 small and 1 capital letter': false,
    '1 digit': false,
    '1 special character': false,
  });
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const checkGoodPassword = (password) => {
    let temp = {};
    temp['minimum 8 length'] = password.length >= 8;
    temp['1 small and 1 capital letter'] = /(?=.*[a-z])/.test(password) && /(?=.*[A-Z])/.test(password);
    temp['1 digit'] = /(?=.*\d)/.test(password);
    temp['1 special character'] = /(?=.*\W])/.test(password) || /[-+_!@#$%^&*.,?]/.test(password);
    setGoodPasswrd(temp);
  };
  const populatePasswordWarnings = () => {
    return ['minimum 8 length', '1 small and 1 capital letter', '1 digit', '1 special character'].map((u) => (
      <p key={u} className={`flex items-center password-helper ${goodPassword[u] ? 'good' : 'bad'}`}>
        <span>{u}</span>
        <Image
          loader={myLoader}
          width={'20'}
          height={'20'}
          src={goodPassword[u] ? '/images/tick.svg' : '/images/closeRed.svg'}
          alt='tick-icon'
        />
      </p>
    ));
  };
  const [progress, setProgress] = useState('email');
  const [showSpinner, setshowSpinner] = useState();
  const router = useRouter();
  const btnEnable = useMemo(() => {
    if (!formData.otp) return false;
    if (formData.password !== formData.confirmPassword) return false;
    const isPasswordGood = Object.values(goodPassword).reduce((result, current) => result && current, true);
    return isPasswordGood;
  }, [goodPassword, formData.otp, formData.confirmPassword, formData.password]);
  const checkEmail = async () => {
    if (!formData.email) return;
    try {
      setshowSpinner(true);

      const res = await fetch(`/api/generate-otp`, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
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
        setProgress('password');
      }
    } catch (e) {
      console.log(e);
    }
    setshowSpinner(false);
  };
  const changePassword = async () => {
    const { email, otp, password, confirmPassword } = formData;
    if (!otp)
      return toast.error('OTP can not be empty', {
        position: 'top-center',
        autoClose: 3000,
      });
    if (otp.length !== 6)
      return toast.error('OTP should be of 6 characters long', {
        position: 'top-center',
        autoClose: 3000,
      });
    if (password !== confirmPassword)
      return toast.error('Passwords do not match', {
        position: 'top-center',
        autoClose: 3000,
      });
    try {
      setshowSpinner(true);
      const res = await fetch(`/api/change-password`, {
        method: 'POST',
        body: JSON.stringify({
          token: otp,
          email,
          password,
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
        setTimeout(() => {
          router.push('/signin');
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
    setshowSpinner(false);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (progress === 'email') {
      await checkEmail();
      return;
    } else await changePassword();
  };
  return (
    <div className='w-full flex justify-center items-center px-2 pt-8'>
      {showSpinner && (
        <div className='fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-white bg-opacity-50 z-10'>
          <Spinner />
        </div>
      )}

      <div className='block mx-auto my-20 p-6 rounded-lg shadow-lg bg-white w-full max-w-md'>
        <p className='font-bold text-2xl mb-6'>Forgot Password</p>
        <form>
          {['email', 'password'].includes(progress) && (
            <div className='form-group mb-6'>
              <label htmlFor='InputEmail1' className='form-label inline-block mb-2 text-gray-700'>
                Email
              </label>
              <input
                type='text'
                disabled={progress === 'password'}
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
                placeholder='Enter Email'
              />
            </div>
          )}
          {progress === 'password' && (
            <>
              <div className='form-group mb-6'>
                <label htmlFor='InputEmail1' className='form-label inline-block mb-2 text-gray-700'>
                  OTP
                </label>
                <input
                  type='text'
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, otp: e.target.value.replace(/\D/g, '').slice(0, 6) }))
                  }
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
                  id='InputOTP1'
                  placeholder='Enter Username'
                />
              </div>
              <div className='form-group mb-6 relative z-0'>
                <label htmlFor='exampleInputPassword1' className='form-label inline-block mb-2 text-gray-700'>
                  Password
                </label>
                <input
                  type='password'
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, password: e.target.value }));
                    checkGoodPassword(e.target.value);
                  }}
                  onFocus={() => setShowPasswordTooltip(true)}
                  onBlur={() => setShowPasswordTooltip(false)}
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
                {showPasswordTooltip && <InputToolTip data={populatePasswordWarnings()} />}
              </div>
              <div className='form-group mb-6'>
                <label htmlFor='exampleInputPassword1' className='form-label inline-block mb-2 text-gray-700'>
                  Confirm Password
                </label>
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
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='exampleInputConfirmPassword1'
                  placeholder='Confirm Password'
                />
              </div>
            </>
          )}
          {/* <div className='form-group form-check mb-6'>
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
          </div> */}
          <div className='flex items-center'>
            <button
              onClick={handleLogin}
              disabled={progress === 'password' && !btnEnable}
              className={`${progress === 'password' && !btnEnable ? 'bg-gray-400' : 'button'}
      px-6
      py-2.5
     color-transition text-white 
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md`}
            >
              {buttonText[progress]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
