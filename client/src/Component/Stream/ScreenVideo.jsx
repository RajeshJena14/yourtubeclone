import React, { useContext } from 'react'
import './screenshare.css'
import { SocketContext } from '../../Context'

const ScreenVideo = () => {
    const { screen, myScreenVideo, userScreenVideo, screenAccepted, screenEnded } = useContext(SocketContext)
    return (
        <>
            {
                screen ? (
                    <div>
                        <video muted autoPlay ref={myScreenVideo} className='screenVid' />
                    </div>
                ) : (
                    screenAccepted && !screenEnded ? (
                        <div>
                            <video muted autoPlay ref={userScreenVideo} className='screenVid1' />
                        </div>
                    ) : (
                        <></>
                    )
                )
            }
        </>
    )
}

export default ScreenVideo
