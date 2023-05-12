import React, { useState } from 'react';
import {useLocation } from 'react-router-dom';
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./List.css";
import {format} from "date-fns";
import { DateRange } from 'react-date-range';
import SearchItems from '../../components/searchItems/searchItems';
import useFetch from "../../hooks/useFetch";
function List() {

  const location = useLocation();
  // console.log(location);
  const [destination, setDestination] = useState(location.state.Destination);
  const [dates, setDate] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [openDate, setOpenDate] = useState(false);
  const {data,loading,error,refetch} = useFetch(`http://localhost:3001/hotels/getallhotel?city=${destination}&&max=${max || 999}&&min=${min || 1}`);
  const handleClick = () =>{
   refetch(); 
  }
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
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
             { openDate&&<DateRange 
              onChange={(item)=>setDate([item.selection])} 
              minDate={new Date()}
              ranges={dates}
              />}
            </div>
           <div className="lsItems">
              <label>Options</label>
            <div className="lsOptions">
              <div className="lsOptionsItems">
                <span className="lsOptionText">Min Price <small>per night</small></span>
                <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionsItems">
                <span className="lsOptionText">Max Price <small>per night</small></span>
                <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
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
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading? "loading":<>
            {data.map(item=>(
               <SearchItems item={item} key={item._id}/>
            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
