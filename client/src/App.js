import './App.css'
import React, { useEffect, useRef, useState } from "react"
import Navbar from './Component/Navbar/Navbar.jsx'
import { useDispatch } from 'react-redux'
import Allroutes from "../src/Allroutes.jsx"
import { BrowserRouter as Router } from 'react-router-dom'
import Drawersliderbar from '../src/Component/Leftsidebar/Drawersliderbar.jsx'
import Createeditchannel from './Pages/Channel/Createeditchannel.jsx'
import Videoupload from './Pages/Videoupload/Videoupload.jsx'
import { fetchallchannel } from './action/channeluser.js'
import { getallvideo } from './action/video.js'
import { getallcomment } from './action/comment.js'
import { getallhistory } from './action/history.js'
import { getalllikedvideo } from './action/likedvideo.js'
import { getallwatchlater } from './action/watchlater.js'
function App() {
  const [toggledrawersidebar, settogledrawersidebar] = useState({
    display: "none"
  })
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchallchannel())
    dispatch(getallvideo())
    dispatch(getallcomment())
    dispatch(getallhistory())
    dispatch(getalllikedvideo())
    dispatch(getallwatchlater())
  }, [dispatch])



  const toggledrawer = () => {
    if (toggledrawersidebar.display === "none") {
      settogledrawersidebar({
        display: "flex",
      })
    } else {
      settogledrawersidebar({
        display: "none",
      })
    }
  }
  const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false)
  const [videouploadpage, setvideouploadpage] = useState(false)

  const [usp, setUsp] = useState(false)
  const count = useRef(Number(localStorage.getItem('count')) || 0)
  if (usp) {
    count.current = count.current + 1
    localStorage.setItem('count', count.current)
    setUsp(false)
  }
  useEffect(() => {
    localStorage.setItem('count', count.current)
  }, [count.current])

  const [closeApp, setcloseApp] = useState(false)
  if (closeApp) {
    setcloseApp(false)
    window.open('about:blank', "_self")
  }

  return (
    <Router>
      {
        videouploadpage && <Videoupload setvideouploadpage={setvideouploadpage} />
      }
      {editcreatechanelbtn && (
        <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />
      )}
      <Navbar seteditcreatechanelbtn={seteditcreatechanelbtn} toggledrawer={toggledrawer} count={count.current} />
      <Drawersliderbar toggledraw={toggledrawer} toggledrawersidebar={toggledrawersidebar} />
      <Allroutes seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage} setUsp={setUsp} setcloseApp={setcloseApp} />
    </Router>
  )
}

export default App
