import React from 'react'
import "./searchItems.css";
import {Link} from "react-router-dom";
function searchItems({item}) {
  return (
    <div className='searchItems'>
        <img src={item.photos[0]}
        alt="" className="siImg" 
        />
        <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          {item.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
        </div>
        <div className="siDetails">
            {item.rating&&<div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="DetailsText">
                <span className="siPrice">${item.chepestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Link to={`/hotel/${item._id}`}>
                <button className="siCheckButton">See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default searchItems
