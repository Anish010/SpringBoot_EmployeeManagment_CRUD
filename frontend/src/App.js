import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddOrUpdateEmployee from './components/AddOrUpdateEmployee';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees/:param_data" element={<AddOrUpdateEmployee/>} />
            <Route path="/employees/:param_data" element={<AddOrUpdateEmployee/>} />
            <Route path="/view-employees/:param_data" element={<ViewEmployeeComponent/>} />
          </Routes>
        </div>
        {/* <FooterComponent /> */}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
