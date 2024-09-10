import React from 'react'
import './video.css'
import Playvideo from '../../components/PlayVideo/Playvideo'
import Recommendes from '../../components/Recommended/Recommendes'
import { useParams } from 'react-router-dom'

const Video = () => {

  const {videoId,categoryId} = useParams();
  return (
    <div className='play-container'>
      <Playvideo videoId={videoId}/>
      <Recommendes categoryId={categoryId}/>
    </div>
  )
}

export default Video