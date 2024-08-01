import React, { useState } from "react"
import NavBar from "../components/NavBar";
import ItemDrop from "../components/ItemDrop";
import Header from "../components/Header.js";
const Home = () => {
    const [result,setResult] = useState({
        name: '',
        price: '', //Todays average price
        image: '',
        dailyTrend: '',
        monthlyTrend: '',
        buy:0,
        sell:0
        
    }); //store all info about item

  
    return (
      <div>
        <Header/>
        <NavBar setResult={setResult} />
        <ItemDrop result={result} />
      </div>
    );
  };

  export default Home;