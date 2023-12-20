import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import InformationModal from '../../components/InformationModal';
import withAuth from '../../components/WithAuthHOC';

const Profile = () => {
  const [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
  });
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');

  /*  useEffect(() => {
     fetch('http://localhost/slproject/backend/api.php?userdata', {
       method: 'GET',
       headers: {
         Authorization: `Bearer ${token}`,
       }
     })
       .then((response) => response.json())
       .then((data) => {
         if (data.error) {
         } else {
           setUserData({
             userName: data.user_name,
             userEmail: data.user_email,
           });
         }
       })
       .catch((error) => {
         console.log('fejl' + error);
       });
   }, []); */


  const updateUser = async (userData) => {
    try {
      const response = await fetch('http://localhost/slproject/backend/api.php?userdata', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Brugerdata er blevet opdateret.');
      } else {
        console.error('Der opstod en fejl ved opdatering af brugerdata.');
      }
    } catch (error) {
      console.error('Der opstod en netværksfejl: ' + error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = {
      userName: e.target.userName.value,
      userEmail: e.target.userEmail.value,
    };

    setUserData(updatedUserData);
    updateUser(updatedUserData);

  };

  return (
    <>
      <section className="lg:flex flex-row gap-20 h-screen">
        <div className="lg:w-1/4 bg-menu rounded-r-lg">
          <Navbar />
        </div>
        <div className="lg:w-3/5 mt-5 mx-auto">
          <div className="flex flex-row gap-3 px-4 mx-1">
            <img src="/assest/user.png" alt="" className="object-cover w-7 icon-white" />
            <h2 className="text-xl font-bold">Your profile:</h2>
          </div>
          <form className="flex flex-col max-w-md p-3" onSubmit={handleSubmit}>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              id="userName"
              defaultValue={userData.userName}
              className="bg-gray-100 py-2 px-3 mb-3"
            />
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              defaultValue={userData.userEmail}
              className="bg-gray-100 py-2 px-3 mb-3"
            />
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              defaultValue='userpassword'
              className="bg-gray-100 py-2 px-3 mb-3"
            />
            <div className="mx-auto">
              <button type="submit" className="bg-green-700 hover-bg-green-600 text-white font-bold py-2 px-4 rounded">Save</button>
            </div>
          </form>
        </div>
      </section>
      <InformationModal title="Profile updated" message="Your profile settings have been updated" />
    </>
  );
};

export default withAuth(Profile);