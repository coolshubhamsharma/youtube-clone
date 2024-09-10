import React, { useState } from 'react'
import './home.css'
import Sidebar from '../../components/SideBar/Sidebar'
import Feed from '../../components/Feed/Feed'

const Home = ({sidebar}) => {

  const [category , setCategory] = useState(0); //we are using this category state to shoe videos of different categories by linnking the home and feed page using category
  
  return (
    <>
     <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} /> {/* we sent the sidebar from app to home and now from home to sidebar */}
     <div className={`container ${sidebar ? "" : "large-container"}`}>
      <Feed category={category}/>
     </div>
    </>
  )
}

export default Home