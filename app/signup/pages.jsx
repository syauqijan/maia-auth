'use client';

import { useState } from 'react';
import { signup } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

export default function SignUpPage() {
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
  });

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    setPasswordValid({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      number: /\d/.test(newPassword),
      symbol: /[!@#$%^&*]/.test(newPassword),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    const formData = new FormData(event.target);

    if (!passwordValid.length || !passwordValid.uppercase || !passwordValid.number || !passwordValid.symbol) {
      setPasswordError('Password does not meet all requirements');
      return;
    }

    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setError('');
    }
  };

  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-secondary pr-5 pl-5'>
      <div className='flex mb-10'>
        <h1 className='text-2xl font-medium'>Sign up To Reflect</h1>
      </div>
      <form className='flex flex-col items-start justify-start w-full h-full' onSubmit={handleSubmit}>
        <label className="text-md mb-2" htmlFor="name">Your Name</label>
        <input className="border w-full min-h-7 mb-5 rounded-md p-2" 
          id="name" 
          name="name" 
          type="text" 
          placeholder='Your Name'
          required
        />
        <label className="text-md mb-2" htmlFor="email">Email Address</label>
        <input className="border w-full min-h-7 mb-5 rounded-md p-2" 
          id="email" 
          name="email" 
          type="email" 
          placeholder='Email'
          required 
        />
        {error === 'Email already exists' && (
            <div className='text-sm text-quaternary bg-quinary p-4'>
                <p >Oops! It seems this email is already in use. Please try another email address or sign in with your existing account.</p>   
            </div>
        )}
        <label className="text-md mb-2" htmlFor="password">Create Password</label>
        <input className="border w-full min-h-7 mb-5 rounded-md p-2" 
          id="password" 
          name="password" 
          type="password" 
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          required 
        />
        {isSubmitted && passwordError && (
        //   <p className='text-red-500 mb-5'>{passwordError}</p>
        <div className="mb-5 text-sm text-quaternary bg-quinary p-4">
          <ul>
            <li className="flex items-center">
              <FontAwesomeIcon icon={passwordValid.length ? faCheckCircle : faCircle} className={passwordValid.length ? ' text-green-500' : 'w-3 h-3 text-transparent border border-quaternary rounded-3xl'} />
              <span className="ml-2">Contains at least 8 characters</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={passwordValid.uppercase ? faCheckCircle : faCircle} className={passwordValid.uppercase ? 'text-green-500' : 'w-3 h-3 text-transparent border border-quaternary rounded-3xl'} />
              <span className="ml-2">Includes both uppercase and lowercase letters</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={passwordValid.number ? faCheckCircle : faCircle} className={passwordValid.number ? 'text-green-500' : 'w-3 h-3 text-transparent border border-quaternary rounded-3xl'} />
              <span className="ml-2">Contains numbers (e.g., 1, 2, 3)</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={passwordValid.symbol ? faCheckCircle : faCircle} className={passwordValid.symbol ? 'text-green-500' : 'w-3 h-3 text-transparent border border-quaternary rounded-3xl'} />
              <span className="ml-2">Includes symbols (e.g., @, #, $)</span>
            </li>
          </ul>
        </div>
          
        )}
        
        <button className="w-full min-h-7 rounded-md p-2 bg-tertiary text-white" type="submit">Sign up</button>
      </form>
      <div className='flex flex-col items-center justify-center mt-8 text-sm'>
        <div className='flex text-center items-center justify-center'>
          <p>
            By creating an account you agree with our <span className='underline underline-offset-1'>Terms of Service</span> and <span className='underline underline-offset-1'>Privacy Policy</span>
          </p>
        </div>
        <div>
          <p className='text-md mt-5'>Already have an account? <a href='#' className='underline underline-offset-1'>Sign In</a></p>
        </div>
      </div>
    </div>
  );
}
