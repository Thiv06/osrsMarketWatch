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
    const getProfit =(value)=>{
        if(value >0){
            return 'green'
        }
        else if(value <0){
            return 'red'
        }
        else{
            return 'black'
        }
    }
    const TAX = Math.round(0.01*result.sell);
    const ROI = ((Math.abs(result.sell-result.buy-TAX)/(result.sell-TAX))*100);
    
    
    return(
        <div id="itemInfo">
        <div className="item-details">
            <img className='item-image' alt={result.name} src={result.image}/>
        </div>              
        < div className="item-details">
            <span className="item-name">{result.name}</span>
        </div>
        <div className="item-details">
            <span className="item-name">Insta Buy</span>
            <span className="item-price">{result.buy.toLocaleString()} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">Insta sell</span>
            <span className="item-price">{result.sell.toLocaleString()} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">Margin</span>
            <span className="item-price">{Math.abs(result.sell-result.buy).toLocaleString()} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">Tax</span>
            <span className="item-price" style={{color: 'red'}}>{'-'+TAX.toLocaleString()} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">ROI</span>
            <span className="item-price"style={{color: getProfit(ROI)}}>{ROI.toLocaleString()}%</span>
        </div>
        <div className="item-details">
            <span className="item-name">Daily Price Change</span>
            <span className="item-price" style={{color: getProfit(result.dailyTrend)}}> {result.dailyTrend} gp</span>
        </div>
        <div className="item-details">
            <span className="item-name">30 Day Trend</span>
            <span className="item-price"style={{color: getTrendStatus(result.monthlyTrend)}}>{result.monthlyTrend}</span>
        </div>
        </div>
    )
}
export default ItemDrop;