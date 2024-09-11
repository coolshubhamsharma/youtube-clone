import React, { useEffect, useState } from 'react'
import './feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { valu_converter } from '../../data'
import moment from 'moment'
// import {API_KEY} from '../../data.js'




const Feed = ({category , searchValue}) => {

    // console.log(searchValue);
    const [data , setData] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [searchData , setSearchData] = useState();
    // const nunmbers = [0,20,2,17,24,28,10,22,25];

    const fetchSearchData = async ()=>{
        try{
            // console.log(searchValue);
            const searchList_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=200&q=${searchValue}&safeSearch=moderate&type=video&key=${API_KEY}`;
            const response = await fetch(searchList_url);
            const Searchdata = await response.json();
            console.log(Searchdata);
            if(Searchdata.items && Searchdata.items.length > 0){
                console.log(Searchdata);
                setSearchData(Searchdata.items)
                //React’s setState function (setSearchData) does not immediately update the state. It’s asynchronous, which means that if you log searchData right after setting it, you’ll still see the previous state value.
            }else{
                console.log("NO SEARCH DATA FOUND");
                setSearchData(null);
            }
        }
        catch(err){
            console.log("error fetching SEARCH data" , err)
            setSearchData(null);
        }
        
      };

  const fetchData = async ()=>{
    try{
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=200&regionCode=US&videoCategoryId=${category}&videoDefinition=high&key=${API_KEY}`;
        const response = await fetch(videoList_url);
        const data = await response.json();

        if(data.items && data.items.length > 0){
            setData(data.items)
        }else{
            console.log("NO API DATA FOUND");
            setData(null);
        }
    }
    catch(err){
        console.log("error fetching Api data" , err)
        setData(null);
    }
    
  };

  useEffect(()=>{
   fetchData();
  } , [category])

  useEffect(() => {
    if (searchValue) {
        fetchSearchData();
    }
  }, [searchValue , category]);


  return (
    
    <div className='feed'>

        { searchData ? searchData.map((item,index)=>{
            return (
                <Link key={index} to={`video/10/${item.id.videoId}`} className='feed'>
                 <div className='card'>
                  <img src={item.snippet.thumbnails.medium.url} alt="" />
                  <h2>{item.snippet.title}</h2> 
                  <h3>{item.snippet.channelTitle}</h3>
                  <p> {moment(item.snippet.publishedAt).fromNow()}</p>{/*Moment. js is a JavaScript library that helps parse, validate, and manipulate date objects in JavaScript. Moment. js can also be used with Node and other JavaScript frameworks like React, Vue, and Angular. */}
                 </div>   
                </Link>  
            )
        }) : data.map((item , index)=>{
            return(
                <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className='feed'>
                 <div className='card'>
                  <img src={item.snippet.thumbnails.medium.url} alt="" />
                  <h2>{item.snippet.title}</h2> 
                  <h3>{item.snippet.channelTitle}</h3>
                  <p>{valu_converter(item.statistics.viewCount)} views & &bull; {moment(item.snippet.publishedAt).fromNow()}</p>{/*Moment. js is a JavaScript library that helps parse, validate, and manipulate date objects in JavaScript. Moment. js can also be used with Node and other JavaScript frameworks like React, Vue, and Angular.*/}
                 </div>   
                </Link>  
            )
        })}
        
    </div>
  )
}

export default Feed