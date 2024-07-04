import React, { useState } from "react"
//import { fetchData } from "../utils/fetchData"
//import './NavBar.css'
// import './ItemDrop'
// import ItemDrop from "./ItemDrop"
import {TextField, Button, Box } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';

const NavBar = ({setResult}) =>{
    const [item,setItem] = useState('')
    const [status,setStatus] = useState('typing')
    const [error, setError] = useState(null)
   
    async function handleSubmit(e){  //***SLOPPY NEEDS TO BE FIXED 
        e.preventDefault();
        setStatus('submitting');
        setError(null);
        const obj = item.toLowerCase()
        try{ //fetch item from GE API
            const URL = `http://localhost:5000/api/item_id?name=${encodeURIComponent(obj)}`; //Encode string to unicode
            const response1 = await fetch(URL)
            const data1 = await response1.json();
            if (!response1.ok) {
                throw new Error('Network response was not ok');
            }

            const detailURL = `http://localhost:5000/api/item?item=${encodeURIComponent(data1.item_id)}`
            const response2 = await fetch(detailURL)
            const data = await response2.json();


            //fetch insta buy/sell price
            const rsWikiURL = `http://localhost:5000/api/instant_prices?item=${encodeURIComponent(data1.item_id)}`
            const response3 = await fetch(rsWikiURL)
            const data2 = await response3.json();

            setResult({name:data.item.name, 
                price:data.item.current.price,
                image:data.item.icon_large,
                dailyTrend:data.item.today.price,
                monthlyTrend:data.item.day30.change,
                buy:data2.high,
                sell:data2.low
            })
            setStatus('done')
        }catch(err){
           setStatus('typing')
           //<Alert severity="error">Item Not Found Alert.</Alert>
           //alert('Item Not Found')
           setError(err)
        }          
        setItem('') //Clear Search Entry
        setStatus('typing')
    }

   function handleTextChange(e){
    setItem(e.target.value)
   }
    
    return(
        <Box  sx={{justifyContent: 'center', display:'flex', alignItems:'center'}}>
        <form onSubmit={handleSubmit} >
        <TextField
            id="standard-basic" 
            label="Find an Item ..." 
            variant="standard"
            placeholder="Search"
            value={item}
            onChange={handleTextChange}
            disabled = {status === 'submitting'}
            fullWidth sx={{ m: 1 }}
        />
        <Button  variant= "outlined" type="submit" startIcon={<SearchIcon />} disabled={item.length === 0 || status === 'submitting'}>
            Search
        </Button>
        {error && (<Alert severity="error">Item Not Found Alert.</Alert>) }
       </form>
        </Box>
    )
}

export default NavBar