import { useEffect, useState } from 'react'
//import React from 'react'
import './App.css'
import axios from 'axios'

import FormInput from './components/FormInput'
import OrderItemToggle from './components/OrderItemToggle'

import logo from './assets/dashboard-logo.png'

import sampleData from './assets/aggregated_data.json' 

// IMPORTS VIA NPM INSTALL: axios, papaparse, bootstrap@5.3.7
function App() {

  const [data, setData] = useState<any | null>(null);
  const [mode, setMode] = useState<"orders" | "items">("orders");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const USE_LOCAL_DATA = true;

        if (USE_LOCAL_DATA) {
          setData(sampleData);
        } else {
          const response = await axios.get("http://127.0.0.1:8888/api/sales");
          console.log(response.data);
        } 
      } catch (err) {
          console.error("Error fetching data:", err)
      }

    };
    
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

      {/* ✅ Only show visualizations if we have data */}
      {data && (
        <div className="visualizations">
          <OrderItemToggle mode={mode} onToggle={setMode} />
          {/* <GeoMap data={data.geographical_orders} /> */}
          {/* <SalesTable data={data.geographical_items_ordered} /> */}
        </div>
      )}


      <p className="read-the-docs">
        Created with React and Vite.
      </p>
    </>
  )
}

export default App
