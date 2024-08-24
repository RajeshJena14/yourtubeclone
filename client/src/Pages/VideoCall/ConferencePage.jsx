import React, { useContext } from 'react'
import { SocketContext } from '../../Context.js'
import './conf.css'

const ConferencePage = ({ mute, children }) => {
    const context = useContext(SocketContext)
    console.log(context)
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = context

    const handleMute = () => {
        return mute
    }

    return (
        <div>
            {children}
            <div className="gridContainer">
                {stream ? (
                    <>
                        <div className="paper">
                            <div className='Name'>{name === '' ? 'Name' : name}</div>
                            <video playsInline ref={myVideo} muted={handleMute()} autoPlay className='video' id='myvid' />
                        </div>
                    </>
                ) : (
                    <></>
                )
                }
                {
                    (callAccepted && !callEnded) ? (
                        <>
                            <div className="paper">
                                <div className='Name'>{name === '' ? 'Name' : name}</div>
                                <video playsInline ref={userVideo} muted={handleMute()} autoPlay className='video' />
                            </div>
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}

export default ConferencePage
