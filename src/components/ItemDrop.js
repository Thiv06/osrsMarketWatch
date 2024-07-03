import React from "react";
import './ItemDrop.css'



const ItemDrop =({result})=>{
    if(result.name === ''){
        return<div></div>;        
    }
    return(
        <div id="itemInfo">
        <div className="item-column">
            <img className='item-image' alt={result.name} src={result.image}/>
        </div>              
        < div className="item-details">
            <span className="item-name">{result.name}</span>
            <span className="item-price">Price:{result.price} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">Daily Price Change</span>
            <span className="item-price">{result.dailyTrend} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">30 Day Trend</span>
            <span className="item-price">{result.monthlyTrend}</span>
        </div>
        </div>
    )
}
export default ItemDrop;