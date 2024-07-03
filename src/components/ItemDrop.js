import React from "react";
import './ItemDrop.css'



const ItemDrop =({result})=>{
    if(result.name === ''){
        return<div></div>;        
    }
    const getTrendStatus =(data) =>{
        if(data.startsWith('+')){
            return 'green'
        }else{
            return 'red'
        }
    };
    return(
        <div id="itemInfo">
        <div className="item-details">
            <img className='item-image' alt={result.name} src={result.image}/>
        </div>              
        < div className="item-details">
            <span className="item-name">{result.name}</span>
            <span className="item-price" >Price: {result.price} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">Daily Price Change</span>
            <span className="item-price" style={{color: getTrendStatus(result.dailyTrend)}}> {result.dailyTrend} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">30 Day Trend</span>
            <span className="item-price"style={{color: getTrendStatus(result.monthlyTrend)}}>{result.monthlyTrend}</span>
        </div>
        </div>
    )
}
export default ItemDrop;