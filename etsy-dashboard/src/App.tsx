import { useEffect } from 'react'
//import React from 'react'
import './App.css'
import axios from 'axios'
import FormInput from './FormInput'
import logo from './assets/dashboard-logo.png'

// IMPORTS VIA NPM INSTALL: axios, csv=parse, bootstrap@5.3.7
function App() {

  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8888/api/sales");
    console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Etsy Logo" />
      </div>
      <h1>Etsy Sales Analysis Dashboard</h1>
      <div className="card">
        <h3>Upload your etsy sales spreadsheets (.csv), and see a visualization of your sales data!</h3>
        <p>
          NOTE: The uploaded files are not stored in any way, no private data (customer names, addresses, etc.) is stored. 
        </p>
      </div>
      <div>
        <FormInput />
      </div>
      <p className="read-the-docs">
        Created with React and Vite.
      </p>
    </>
  )
}

export default App
