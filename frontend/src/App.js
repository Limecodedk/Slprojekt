import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateSale from './page/CreateSale';
import Search from './page/SearchVehicles';
import Reports from './page/Reports';
import Login from './page/Login';
import Profile from './page/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateSale />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
