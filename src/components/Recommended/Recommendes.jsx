import React, { useEffect, useState } from 'react'
import './recommended.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { API_KEY, valu_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommendes = ({categoryId}) => {

    const [recommendedVideo , setRecommendedVideos] = useState([]);

    const fetchrecommendedVideos = async()=>{
        try{
            const recommendedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResult=30&videoCategoryId=${categoryId}&key=${API_KEY}`;
            const response = await fetch(recommendedVideo_url);
            const data = await response.json();
            // console.log(data.items) 
            
                setRecommendedVideos(data.items);
            
            
    
        }
        catch (error) {
            console.error('Error fetching recommendedVideo data:', error);
            setRecommendedVideos(null);
        }
    }

    useEffect(()=>{
       fetchrecommendedVideos();
    } , [])
  return (
    <div className='recommended'>
        {recommendedVideo.map((item,index)=>{
            return(
            <Link to={`/video/${categoryId}/${item.id}`} className='side-video-list'>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <div>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{valu_converter(item.statistics.viewCount)} views</p>                 
                </div>
            </div>
        </Link>
            )
        })}
    </div>
  )
}

export default Recommendes