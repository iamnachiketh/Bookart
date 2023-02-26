import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./List.css";
import {format} from "date-fns";
import { DateRange } from 'react-date-range';
import SearchItems from '../../components/searchItems/searchItems';
function List() {

  const location = useLocation();
  // console.log(location);
  const [destination, setDestination] = useState(location.state.Destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItems">
              <label>Destination</label>
              <input placeholder={destination}/>
            </div>
            <div className="lsItems">
              <label>Check-in Date</label>
              <span  onClick={() => setOpenDate(!openDate)} >{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
             { openDate&&<DateRange 
              onChange={(item)=>setDate([item.selection])} 
              minDate={new Date()}
              ranges={date}
              />}
            </div>
           <div className="lsItems">
              <label>Options</label>
            <div className="lsOptions">
              <div className="lsOptionsItems">
                <span className="lsOptionText">Min Price <small>per night</small></span>
                <input type="number" className="lsOptionInput" />
              </div>
              <div className="lsOptionsItems">
                <span className="lsOptionText">Max Price <small>per night</small></span>
                <input type="number" className="lsOptionInput" />
              </div>
              <div className="lsOptionsItems">
                <span className="lsOptionText">Adult</span>
                <input type="number" className="lsOptionInput" min={1} placeholder={options.adult} />
              </div>
              <div className="lsOptionsItems">
                <span className="lsOptionText">Children</span>
                <input type="number" className="lsOptionInput" min={0} placeholder={options.children}/>
              </div>
              <div className="lsOptionsItems">
                <span className="lsOptionText">Rooms</span>
                <input type="number" className="lsOptionInput" min={1} placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItems/>
            <SearchItems/>
            <SearchItems/>
            <SearchItems/>
            <SearchItems/>
            <SearchItems/>
            <SearchItems/>
            <SearchItems/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
