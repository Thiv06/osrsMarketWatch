import React, { useState } from "react"
import NavBar from "../components/NavBar";
import ItemDrop from "../components/ItemDrop";



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
        <NavBar setResult={setResult} />
        <ItemDrop result={result} />
      </div>
    );
  };

  export default Home;