import React, { useContext } from 'react'
import {useState} from 'react';
import "./Header.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBed , faPlane,faCar,faTaxi, faCalendarDays, faPerson} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';

function Header({type}) {
  const [Destination , setDestination] = useState('');
  const [openDate,setOpenDate] = useState(false);
  const [options,setOpenOptions] = useState({
    adult:0,
    children:0,
    room:1
  });

const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const navigate = useNavigate();

  const handleOption = (name,operation)=>{
    setOpenOptions((prev)=>{return{
      ...prev,[name]:operation==="i"? options[name] + 1 : options[name] - 1,
    }})

  }

  const {dispatch} = useContext(SearchContext);
  const [select, setSelectOption] = useState(false);

  const handleSearch = ()=>{
      dispatch({type:"NEW_SEARCH",payload:{Destination, dates, options }})
       navigate('/hotels',{state:{Destination,dates,options}})
  }

  return (
    <div className='header'>
      <div className={type==="list"? "headerContainer listmode":"headerContainer"}>
        <div className='headerList'>
            <div className='headerListItem active'>
               <FontAwesomeIcon icon={faBed} />
               <span>Stays</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type!=="list"&&<>
        <h1 className='headerTitle'>Makes you Feel Book Again.</h1>
        <p className='headerDesc'>
          Get rewarded for your travels unlock instant saving of 10% or or more with free cool booking
        </p>
        <button className='headerBtn'>Sign/Register</button>
        <div className='headerSearch'>
         <div className='headerSearchItem'>
               <FontAwesomeIcon icon={faBed} className='headerIcon'/>
               <input type="text"  
               placeholder='where are you going?'
               className='headerSearchInput'
               onChange={e=>setDestination(e.target.value)}
               />
          </div>
          <div className='headerSearchItem'>
               <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
               <span onClick={()=>setOpenDate(!openDate)} className='headerSearchTeXT'>{`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}</span>
              {openDate&&<DateRange
                editableDateInputs={true}
                minDate={new Date()}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
              />}
          </div>
          <div className='headerSearchItem'>
               <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
               <span onClick={()=>setSelectOption(!select)} className='headerSearchTeXT'>{`${options.adult} adult ${options.children} children  ${options.room} room`}</span>
               {select&&<div className='options'>
                  <div className='optionsItem'>
                    <span className='optionText'>Adult</span>
                    <div className='optionCounter'>
                    <button className='optionCounterButton' disabled={options.adult<=0} onClick={()=>handleOption("adult","d")}>-</button>
                    <span className='optionCounterNumber'>{options.adult}</span>
                    <button className='optionCounterButton' onClick={()=>handleOption("adult","i")}>+</button>
                    </div>
                  </div>
                  <div className='optionsItem'>
                    <span className='optionText'>Children</span>
                    <div className='optionCounter'>
                    <button className='optionCounterButton' disabled={options.children<=0} onClick={()=>handleOption("children","d")}>-</button>
                    <span className='optionCounterNumber'>{options.children}</span>
                    <button className='optionCounterButton' onClick={()=>handleOption("children","i")}>+</button>
                    </div>
                  </div>
                  <div className='optionsItem'>
                    <span className='optionText'>Room</span>
                    <div className='optionCounter'>
                  {options.adult>=1&&<>
                    <button className='optionCounterButton' disabled={options.room<=0} onClick={()=>handleOption("room","d")}>-</button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button className='optionCounterButton'onClick={()=>handleOption("room","i")}>+</button>
                    </>
                    }
                    </div>
                  </div>
               </div>
              }
          </div>
          <div className='headerSearchItem'>
              <button className='headerBtn' onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>
        }
      </div>
    </div>
  )
}

export default Header
