import Axios from "axios";
import { useState,useEffect } from "react";

const useFetch =(url)=>{
   const [data,setData] = useState([]);
   const [loading,setLoading] = useState(false);
   const [error,setError] = useState('');

   useEffect(()=>{
       const fetchData = async ()=>{
        setLoading(true);
        try{
            const res = await Axios.get(url);
            setData(res.data);
        }catch(err){
          setError(err)
        }
        setLoading(false)
       };
       fetchData();
   },[url]);

const refetch = async ()=>{
    setLoading(true);
    try{
        const res = await Axios.get(url);
        setData(res.data);
    }catch(err){
      setError(err)
    }
    setLoading(false);
   }
   return {data,error,loading,refetch};
};

export default useFetch;