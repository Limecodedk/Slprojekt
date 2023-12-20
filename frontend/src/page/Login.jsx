import { clear } from '@testing-library/user-event/dist/clear';
import React, { useState } from 'react';
import { handleFormSubmit } from '../APIConfig'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFormSubmit(email, password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <section className='container mx-auto h-screen flex justify-center items-center bg-menu'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email' className='text-white'>Email (admin@test.dk)</label>
          <input
            type='text'
            name='email'
            id='email'
            className='bg-gray-100 mb-2 w-80 rounded'
            onChange={handleEmailChange}
          />
          <label htmlFor="password" className='text-white'>Password (admin)</label>
          <input
            type='password'
            name='password'
            id='password'
            className='rounded mb-4'
            value={password}
            onChange={handlePasswordChange}
          />
          <button type='submit' className='bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>Login</button>
        </form>
      </section>
    </>
  );
};

export default Login;
