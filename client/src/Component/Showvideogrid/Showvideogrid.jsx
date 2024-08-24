import React from 'react'
import "./Showvideogrid.css"
import Showvideo from '../Showvideo/Showvideo.jsx'
const Showvideogrid = ({ vids }) => {
    return (
        <div className="Container_ShowVideoGrid">
            {
                vids?.reverse().map(vi => {
                    return (
                        <div key={vi._id} className="video_box_app">
                            <Showvideo vids={vi} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Showvideogrid


