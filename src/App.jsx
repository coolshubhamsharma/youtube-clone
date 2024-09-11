import React, { useState } from 'react'
import Navbar from './components/NavBar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Videos/video'
import Video1 from './Pages/Videos/Video1'

const App = () => {

  const [sidebar , setSidebar] = useState(true);
  const [searchValue , setSearchValue] = useState('');
  if(searchValue){
  // console.log(searchValue);
  }

  return (
    <div>
      <Navbar setSidebar={setSidebar} setSearchValue={setSearchValue}/>
      <Routes>
        <Route path='/' element={<Home searchValue={searchValue} sidebar={sidebar}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
        <Route path='/video/:videoId' element={Video1}/>
      </Routes>

    </div>
  )
}

export default App