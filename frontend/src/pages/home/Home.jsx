import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import "./Home.css";
import Header from "../../components/header/Header";
import Featured from '../../components/featured/Featured';
import PropertyList from '../../components/propertyList/propertyList';
import FeaturedProperties from '../../components/featuredProperties/featuredProperties';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';

function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homeContainer'>
        <Featured/>
        <h1 className="homeTitle">Browse property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
