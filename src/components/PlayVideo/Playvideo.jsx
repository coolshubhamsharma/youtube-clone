import React, { useEffect, useState } from 'react'
import './playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import save from '../../assets/save.png'
import { API_KEY, valu_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const Playvideo = ({videoId}) => {

// const Playvideo = () => {
        
    // const {videoId} = useParams();   

    const [apiData , setApiData] = useState(null);
    const [channelData , setChannelData] = useState(null);
    const [commentData , setCommentData] = useState([]);

    const fetchVideoData = async () => {
        try {
          const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
          const response = await fetch(videoDetails_url);
          const data = await response.json();
           
        //   console.log(data);
          if (data.items && data.items.length > 0) {
            setApiData(data.items[0]);
          } else {
            console.error('No video data found');
            setApiData(null);
          }
        } catch (error) {
          console.error('Error fetching video data:', error);
          setApiData(null);
        }
    };

    const fetchChannelData = async()=>{
        //fetching channel data
        try{
          const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

          const response = await fetch(channelData_url);
          const data =  await response.json();
        //   console.log(apiData.snippet.channelId);
        //   console.log(data);

          if (data.items && data.items.length > 0) {
            setChannelData(data.items[0]);
          } else {
            console.error('No channel data found');
            setChannelData(null);
          }
        } catch (error) {
            console.error('Error fetching channel data:', error);
            setChannelData(null);
        }

    }

    const fetchCommentData = async()=>{
        //fetching comment data
        try{
          const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;

          const response = await fetch(commentData_url);
          const data =  await response.json();
        //   console.log(apiData.snippet.channelId);
          console.log(data);
        //   setCommentData(data.items);

          if (data.items && data.items.length > 0) {
            setCommentData(data.items);
          } else {
            console.error('No comment data found');
            setCommentData(null);
          }
        } catch (error) {
            console.error('Error fetching comment data:', error);
            setCommentData(null);
        }

    }
      
    useEffect(()=>{
      fetchVideoData();
      fetchCommentData();
    } , [videoId])

    useEffect(()=>{
        fetchChannelData();
    },[apiData])

    // useEffect(()=>{
    //     fetchCommentData();
    // },[videoId]);

    // const commentDataAVailable = commentData ? commentData

  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiData ? valu_converter(apiData.statistics.viewCount) : "16k"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "16k"}</p>
            <div>
                <span><img src={like} alt="" />{apiData ? valu_converter(apiData.statistics.likeCount) : "16k"}</span>
                <span><img src={dislike} alt="" />2</span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData ? channelData.snippet.thumbnails.default.url : jack} alt="" />
            <div>
                 <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                <span style={{}}>{channelData ? valu_converter(channelData.statistics.subscriberCount) : "1M"}Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        
        <div className="vid-description">
            <p>{apiData ? apiData.snippet.description.slice(0,250) : "Description Here"}</p>
            
            <hr />
            <h4>{apiData ? valu_converter(apiData.statistics.commentCount)  : '102'} comments</h4>
            {commentData ? commentData.map((item , index)=>{
                return (
                    <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl ? item.snippet.topLevelComment.snippet.authorProfileImageUrl : user_profile } alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
                )
            }) : (
              <div className="comment">
                    <img src={user_profile } alt="" />
                    <div>
                        <h3>Shubham<span>1 day ago</span></h3>
                        <p>If you have come this far , you should hire me</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>255M</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
            )}
            
        </div>


    </div>
  )
}

export default Playvideo