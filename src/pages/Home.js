import React, { useState } from "react"
import NavBar from "../components/NavBar";
import ItemDrop from "../components/ItemDrop";
import Header from "../components/Header";
const Home = () => {
    const [result,setResult] = useState({
        name: '',
        price: '',
        image: '',
        dailyTrend: '',
        monthlyTrend: ''
        
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