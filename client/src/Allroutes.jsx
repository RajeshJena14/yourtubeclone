import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Search from './Pages/Search/Search.jsx'
import Videopage from './Pages/Videopage/Videopage.jsx'
import Channel from './Pages/Channel/Channel.jsx'
import Library from './Pages/Library/Library.jsx'
import Likedvideo from './Pages/Likedvideo/Likedvideo.jsx'
import Watchhistory from './Pages/Watchhistory/Watchhistory.jsx'
import Watchlater from './Pages/Watchlater/Watchlater.jsx'
import Yourvideo from './Pages/Yourvideo/Yourvideo.jsx'
import MeetPage from './Pages/VideoCall/MeetPage.jsx'
import SingleUserCall from './Pages/VideoCall/singleUserCall.jsx'

const Allroutes = ({ seteditcreatechanelbtn, setvideouploadpage, setUsp, setcloseApp }) => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:Searchquery' element={<Search />} />
      <Route path='/videopage/:vid' element={<Videopage setUsp={setUsp} setcloseApp={setcloseApp} />} />
      <Route path='/Library' element={<Library />} />
      <Route path='/Likedvideo' element={<Likedvideo />} />
      <Route path='/Watchhistory' element={<Watchhistory />} />
      <Route path='/Watchlater' element={<Watchlater />} />
      <Route path='/Yourvideo' element={<Yourvideo />} />
      <Route path='/channel/:cid' element={<Channel seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage} />} />
      <Route path='/multimeet/:mroomid' element={<MeetPage />} />
      <Route path='/p2pVideoCall' element={<SingleUserCall />} />
    </Routes>
  )
}

export default Allroutes