import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../src/components/spinner';
import myLoader from '../src/loader';
import { fileSizeOneMb } from '../src/utils/validaitons';
const InputToolTip = ({ data }) => {
  return (
    <div className='absolute t-0 bg-white shadow-lg bottom-full z-10  flex flex-col rounded'>
      <div className=' mt-2 password-helper-container px-2.5 py-1.5 relative'>{data}</div>
    </div>
  );
};
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
    type: 'text',
    key: 'state',
  },
  {
    label: 'PIN',
    mandatory: true,
    type: 'text',
    key: 'pin',
  },
  {
    label: 'Mobile',
    mandatory: true,
    type: 'text',
    key: 'phone',
  },
  {
    label: 'Whatsapp Number',
    mandatory: true,
    type: 'text',
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
    password: '',
    confirmPassword: '',
  });
  const [files, setFiles] = useState({
    pan_gir_number: '',
    aadhar_passport: '',
    gst_number: '',
    visitingCard: '',
    tanNumber: '',
  });
  const [warnings, setWarnings] = useState({});
  const [btnEnabled, setBtnEnabled] = useState(false);
  const [showSpinner, setshowSpinner] = useState(false);
  const router = useRouter();
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

  const submit = async (e) => {
    e.preventDefault();
    setshowSpinner(true);

    console.log(data);
    const formData1 = new FormData();
    Object.entries(files).forEach(([key, value]) => {
      formData1.append(key, value);
    });
    Object.entries(formData).forEach(([key, value]) => {
      formData1.append(key, value);
    });
    console.log(data);
    try {
      const res = await fetch(`/api/register/agent`, {
        method: 'POST',
        body: formData1,
      });
      const response = await res.json();
      console.log(response);
      if (response.error) {
        toast.error(response.error, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.success('Sign up succesful. Your acount will be activated post verification', {
          position: 'top-center',
          autoClose: 3000,
        });
        router.push('/signin');
      }
    } catch (e) {
      console.log(e);
    }
    setshowSpinner(false);
  };

  useEffect(() => {
    const isPasswordGood = Object.values(goodPassword).reduce((result, current) => result && current, true);
    if (!isPasswordGood) {
      btnEnabled && setBtnEnabled(false);
      return;
    }
    const mandatoryKeys = data.reduce((acc, item) => (item.mandatory ? [...acc, item.key] : acc), []);
    let enableBtn = mandatoryKeys.reduce((result, key) => result && (!!formData[key] || !!files[key]), true);
    console.log(enableBtn, formData, files, btnEnabled);
    if (enableBtn) {
      if (formData.confirmPassword !== formData.password) {
        enableBtn = false;
        setWarnings((prev) => ({
          ...prev,
          confirmPassword: 'Passwords do not match',
        }));
      } else if (warnings.confirmPassword) {
        setWarnings((prev) => ({
          ...prev,
          confirmPassword: '',
        }));
      }
    }
    enableBtn !== btnEnabled && setBtnEnabled(enableBtn);
  }, [formData, files]);

  return (
    <div className='block mx-auto pt-16 my-20 p-6 rounded-lg shadow-lg bg-white max-w-md lg:max-w-5xl'>
      {showSpinner && (
        <div className='z-50 fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-white bg-opacity-70'>
          <Spinner />
        </div>
      )}
      <p className='font-bold text-2xl mb-6'>Sign Up</p>
      <form className='flex flex-col lg:flex-row lg:flex-wrap lg:gap-x-4 gap-4'>
        {data.map((item) => (
          <div className='relative my-4 w-full lg:w-[49%]' key={item.key}>
            <input
              type={item.type}
              id={`floating_${item.key}`}
              onChange={(e) => {
                if (item.type === 'file') {
                  if (!fileSizeOneMb(e.target.files[0])) {
                    toast.warn(`${item.label} file size should not be more than 1 MB`, {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                    return;
                  }
                  setFiles((prev) => ({
                    ...prev,
                    [item.key]: e.target.files[0],
                  }));
                } else {
                  setFormData((prev) => ({
                    ...prev,
                    [item.key]: e.target.value.trim(),
                  }));
                  item.key === 'password' && checkGoodPassword(e.target.value.trim());
                }
              }}
              className='block px-2.5 pb-2.5 pt-8 w-full h-full text-sm rounded-lg border border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              onFocus={() => item.key === 'password' && setShowPasswordTooltip(true)}
              onBlur={() => item.key === 'password' && setShowPasswordTooltip(false)}
            />
            <label
              htmlFor={`floating_${item.key}`}
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px- peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 left-1'
            >
              {item.label}
              {item.mandatory ? <span className='text-red-500'>*</span> : null}
            </label>
            {warnings[item.key] && (
              <p className='absolute text-red-500 text-xs md:text-sm top-full'>{warnings[item.key]}</p>
            )}
            {item.key === 'password' && showPasswordTooltip && <InputToolTip data={populatePasswordWarnings()} />}
          </div>
        ))}
        <div className='flex items-center w-full'>
          <button
            onClick={(e) => btnEnabled && submit(e)}
            className={` ${btnEnabled ? 'button' : 'bg-gray-400'}
      px-8
      py-4
 color-transition  
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
            <a
              href={'/signin'}
              className='cursor-pointer text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'
            >
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
