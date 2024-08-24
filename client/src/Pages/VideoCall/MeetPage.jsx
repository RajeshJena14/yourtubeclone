import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { BsRecordFill, BsRecordCircleFill } from 'react-icons/bs'
import './MeetPage.css'

const MeetPage = () => {
    const d = new Date()
    if (d.getHours() >= 18 && d.getHours() < 24) {
        const currentuser = useSelector(state => state.currentuserreducer)
        const [isRecording, setIsRecording] = useState(false)
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
        const handleRecord = async () => {
            setIsRecording(!isRecording)
            if (!isRecording) {
                RecordStart()
            }
        }

        const { mroomid } = useParams()
        const myMeeting = async (elem) => {
            const appId = 1110471720
            const serverSecret = "b15d62e6c386417a40eeb4e014b565ca"
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                mroomid,
                currentuser?.result._id,
                currentuser?.result.email,
            )
            const zp = ZegoUIKitPrebuilt.create(kitToken)
            zp.joinRoom({
                container: elem,
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                }
            })
        }
        return (
            <div className='room-page'>
                <div ref={myMeeting} />
                <div className="recordbtn" onClick={handleRecord}>
                    {
                        isRecording ? (
                            <>
                                <BsRecordCircleFill size={60} style={{ color: "red" }} />
                            </>
                        ) : (
                            <BsRecordFill size={60} style={{ color: "red" }} />
                        )
                    }
                </div>
            </div>
        )
    }
    else {
        return <h1 style={{ textAlign: "center" }}>AVAILABLE BETWEEN 6PM & 12AM</h1>
    }
}

export default MeetPage
