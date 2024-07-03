import React, { useState } from "react"
//import { fetchData } from "../utils/fetchData"
//import './NavBar.css'
// import './ItemDrop'
// import ItemDrop from "./ItemDrop"
import {TextField, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const NavBar = ({setResult}) =>{
    
    const [item,setItem] = useState('')
    const [status,setStatus] = useState('typing')
    const [error, setError] = useState(null)
   
    async function handleSubmit(e){  //***SLOPPY NEEDS TO BE FIXED 
        e.preventDefault();
        setStatus('submitting')
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


            setResult({name:data.item.name, 
                price:data.item.current.price,
                image:data.item.icon_large,
                dailyTrend:data.item.today.price,
                monthlyTrend:data.item.day30.change
            })
            //setResult(e=>{name:e.data.item.name;price:e.data.item.current.price})
            setStatus('done')
        }catch(err){
           setStatus('typing')
           alert('Item Not Found')
           setError(err)
        }          
        setItem('') //Clear Search Entry
        //setStatus('typing')
    }

    
//    if(status === 'done'){ //send item to ItemDrop Component
//         return(
//             ItemDrop(result)
//         ) 
//    }


   function handleTextChange(e){
    setItem(e.target.value)
   }
    
    return(
       <form onSubmit={handleSubmit}>
        <TextField
            id="standard-basic" 
            label="Find an Item ..." 
            variant="standard"
            placeholder="Search"
            value={item}
            onChange={handleTextChange}
            disabled = {status === 'submitting'}
        />
        <Button variant= "outlined"  startIcon={<SearchIcon />} disabled={item.length === 0 || status === 'submitting'}>
            Search
        </Button>
       </form>
    )
}

export default NavBar