import "./VideoCall.css"
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io"
import { useNavigate } from 'react-router-dom'

const VideoCall = ({ setcallbtn }) => {
    const [mroomid, setmRoomid] = useState('')
    const navigate = useNavigate()
    const handleoSubmit = (ev) => {
        ev.preventDefault()
        setcallbtn(false)
        navigate(`/p2pVideoCall`)
    }
    const handlemSubmit = (ev) => {
        ev.preventDefault()
        setcallbtn(false)
        navigate(`/multimeet/${mroomid}`)
    }
    return (
        <div className="Call_container">
            <div className="Call_container2">
                <div className="close-icon">
                    <IoMdClose size={25} onClick={() => setcallbtn(false)} />
                </div>
                <div className="video_title">Make A Video Call</div>
                <div className="userNo-box">
                    <form onSubmit={handleoSubmit}>
                        <div className="user-box">
                            <p className="classify">One-To-One</p>
                            <button className="call_icon">
                                Join Room
                            </button>
                        </div>
                    </form>
                    <div className="or">
                        <hr />OR<hr />
                    </div>
                    <form onSubmit={handlemSubmit}>
                        <div className="user-box">
                            <p className="classify">Multi-User</p>
                            <input type="text" required placeholder="Room ID" value={mroomid} onChange={(e) => setmRoomid(e.target.value)} />
                            <button className="call_icon">
                                Join Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VideoCall
