import React, { useContext, useRef, useState } from 'react'
import './MicCamera.css'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { LuScreenShare, LuScreenShareOff } from 'react-icons/lu'
import { BsRecordFill, BsRecordCircleFill } from 'react-icons/bs'
import { SocketContext } from '../../Context'

const MicCamera = ({ setMute }) => {
    const context = useContext(SocketContext)
    const { startScreenShare, stopScreenSharing, callAccepted, callEnded } = context
    const [isMuted, setIsMuted] = useState(false)
    const [isScreenShare, setIsScreenShare] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    const recordings = useRef(localStorage.getItem('recordings'))
    let mediaRecorder
    let data = []
    const RecordStart = async () => {
        const screen = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen', }, })
        mediaRecorder = new MediaRecorder(screen)
        mediaRecorder.ondataavailable = (items) => {
            data.push(items.data)
        }
        mediaRecorder.start()
        mediaRecorder.onstop = () => {
            const blob = new Blob(data, { type: 'video/webm' })
            data = []
            const reader = new FileReader()
            reader.onloadend = () => {
                localStorage.setItem('recordings', reader.result.split(',')[1])
            }
            reader.readAsDataURL(blob)
            alert('Recording Stopped')
            setIsRecording(false)
        }
    }

    const handleMic = () => {
        setIsMuted(!isMuted)
        setMute(!isMuted)
    }
    const handleScreenShare = () => {
        setIsScreenShare(!isScreenShare)
        if (!isScreenShare) {
            startScreenShare()
        }
        else {
            stopScreenSharing()
        }
    }
    const handleRecord = async () => {
        setIsRecording(!isRecording)
        if (!isRecording) {
            RecordStart()
        }
    }

    return (
        <div className='streamBox'>
            <div className="stream-icons" onClick={handleMic}>
                {
                    isMuted ? (
                        <FaMicrophoneSlash size={25} />
                    ) : (
                        <FaMicrophone size={25} />
                    )
                }
            </div>
            {
                callAccepted && !callEnded &&
                (
                    <div className="stream-icons" id='shareScreen' onClick={handleScreenShare}>
                        {
                            isScreenShare ? (
                                <LuScreenShareOff size={25} />
                            ) : (
                                <LuScreenShare size={25} />
                            )
                        }
                    </div>
                )
            }
            <div className="stream-icons1" onClick={handleRecord}>
                {
                    isRecording ? (
                        <>
                            <BsRecordCircleFill size={50} style={{ color: "red" }} />
                        </>
                    ) : (
                        <BsRecordFill size={50} style={{ color: "red" }} />
                    )
                }
            </div>
        </div>
    )
}

export default MicCamera
