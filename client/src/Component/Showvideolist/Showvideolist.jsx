import React from 'react'
import Showvideo from "../Showvideo/Showvideo.jsx"
import { useSelector } from 'react-redux'
const Showvideolist = ({ videoid }) => {
  const vids = useSelector(state => state.videoreducer)
  return (
    <div className="Container_ShowVideoGrid">
      {
        vids?.data?.filter(q => q._id === videoid).map(vi => {
          return (
            <div className="video_box_app" key={vi._id}>
              <Showvideo vids={vi} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Showvideolist