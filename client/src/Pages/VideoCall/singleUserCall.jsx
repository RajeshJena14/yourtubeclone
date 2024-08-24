import process from 'process'
import React, { useState } from 'react';
import './singleUserCall.css'
import { ContextProvider } from '../../Context.js'
import Sidebar from './Sidebar.jsx';
import Notifications from './Notifications.jsx';
import ConferencePage from './ConferencePage.jsx';
import MicCamera from '../../Component/Stream/MicCamera.jsx';
import ScreenVideo from '../../Component/Stream/ScreenVideo.jsx';
window.process = process

const SingleUserCall = () => {
  const d = new Date()
  if (d.getHours() >= 18 && d.getHours() < 24) {
    const [mute, setMute] = useState(false)
    return (
      <ContextProvider>
        <div className="wrapper">
          <div className="appBar">
            <h2>Video Chat</h2>
          </div>
          <ConferencePage mute={mute}>
            <ScreenVideo />
          </ConferencePage>
          <Sidebar>
            <Notifications />
          </Sidebar>
        </div>
        <MicCamera setMute={setMute} />
      </ContextProvider>
    )
  }
  else {
    return <h1 style={{ textAlign: "center" }}>AVAILABLE BETWEEN 6PM & 12AM</h1>
  }
}

export default SingleUserCall