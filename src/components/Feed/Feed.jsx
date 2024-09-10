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
import { API_KEY, valu_converter } from '../../data'
import moment from 'moment'
// import {API_KEY} from '../../data.js'




const Feed = ({category}) => {

    const [data , setData] = useState([]);

  const fetchData = async ()=>{
    try{
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=200&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
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

  return (
    
    <div className='feed'>

        {data.map((item , index)=>{
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