import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Home from './component/Home';
import Hierarchy from './component/Hierarchy';
import LeaveForm from './component/LeaveForm';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Performance from './component/Performance';

function App() {
  return (
    // <div>
    //   <Navbar/>
    //   <Sidebar/>
    //   <Hierarchy/>
    // </div>
    <BrowserRouter>
    {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/leaveform" element={<LeaveForm />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
