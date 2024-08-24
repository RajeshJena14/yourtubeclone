import React from 'react'
import './Showvideo.css'
import { Link } from 'react-router-dom'
import moment from "moment"
const Showvideo = ({ vids }) => {
  return (
    <>
      <Link to={`/videopage/${vids?._id}`}>
        <video src={`http://localhost:5000/${vids?.filepath}`} className='video_ShowVideo' />
      </Link>
      <div className="video_description">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App">
            <>{vids?.uploader?.charAt(0).toUpperCase()}</>
          </div>
        </div>

        <div className="video_details">
          <p className="title_vid_ShowVideo">{vids?.videotitle}</p>
          <pre className="vid_views_UploadTime">{vids?.uploader}</pre>
          <pre className="vid_views_UploadTime">
            {vids?.views} views <div className="dot"></div>{moment(vids?.createdat).fromNow()}
          </pre>
        </div>
      </div>
    </>
  )
}

export default Showvideo