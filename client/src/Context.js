import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext()

const socket = io('http://localhost:2000')

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [stream, setStream] = useState()
    const [stream1, setStream1] = useState()
    const [name, setName] = useState('')
    const [call, setCall] = useState({})
    const [me, setMe] = useState('')

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    const shareRef = useRef()

    const sig = useRef()
    const shareFrom = useRef()

    const [screen, setScreen] = useState()
    const [screen1, setScreen1] = useState()
    const [nonhostId, setNonhostId] = useState()
    const [share, setShare] = useState({})
    const [screenAccepted, setScreenAccepted] = useState(false)
    const [screenEnded, setScreenEnded] = useState(false)
    const myScreenVideo = useRef()
    const userScreenVideo = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream)
            })
            .catch((er) => alert(er))
        socket.emit('room:join')

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
        })

        return () => {
            socket.off('callUser')
        }

    }, [])

    useEffect(() => {
        socket.on('shareUser', async ({ from, name: callerName, signal }) => {
            sig.current = await signal
            shareFrom.current = await from
            setShare({ isReceivingScreen: true, from, name: callerName, signal: sig })
            answerScreen()
        })
        return () => {
            socket.off('shareUser')
        }
    }, [])

    useEffect(() => {
        socket.on('room:join', (data) => {
            setMe(data)
        })
        return () => {
            socket.off('room:join')
        }
    }, [socket])

    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream
        }
    }, [stream])
    useEffect(() => {
        if (userVideo.current && stream1) {
            userVideo.current.srcObject = stream1
        }
    }, [stream1])


    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({ initiator: false, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from })
        })
        peer.on('stream', (currentStream) => {
            setStream1(currentStream)
        })
        peer.signal(call.signal)
        connectionRef.current = peer
    }

    const callUser = (id) => {
        setNonhostId(id)
        const peer = new Peer({ initiator: true, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name })
        })
        peer.on('stream', (currentStream) => {
            setStream1(currentStream)
        })
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    }

    const shareScreen = (currstream, id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: screen })
        currstream.getTracks().forEach(track => {
            peer.addTrack(track, currstream)
        })
        peer.on('signal', (data) => {
            socket.emit('shareUser', { userToShare: id, signalData: data, from: me, name })
        })
        peer.on('track', (track, stream) => {
            if (track.kind === 'video') {
                setScreen1(stream)
            }
        })
        socket.on('screenAccepted', (signal) => {
            setScreenAccepted(true)
            peer.signal(signal)
        })
        shareRef.current = peer
    }

    const answerScreen = () => {
        setScreenAccepted(true)
        const peer = new Peer({ initiator: false, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('answerScreen', { signal: data, to: shareFrom.current })
        })
        peer.on('track', (track, stream) => {
            console.log(track)
            if (track.kind === 'video') {
                setScreen1(stream)
            }
        })
        peer.signal(sig.current)
        shareRef.current = peer
    }


    const startScreenShare = () => {
        navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen', }, audio: true })
            .then((currstream) => {
                setScreen(currstream)
                let vidTrack = currstream.getVideoTracks()[0]
                if (connectionRef.current) {
                    console.log(nonhostId)
                    shareScreen(currstream, nonhostId)
                }
                vidTrack.onended = () => {
                    stopScreenSharing()
                }
            })
            .catch((error) => console.error('Error sharing screen:', error))
    }
    const stopScreenSharing = () => {
        setScreenAccepted(false)
        setScreenEnded(true)
        shareRef.current.destroy()
        setScreen(null)
    }
    useEffect(() => {
        if (myScreenVideo.current && screen) {
            myScreenVideo.current.srcObject = screen
        }
    }, [screen])
    useEffect(() => {
        if (userScreenVideo.current && screen1) {
            userScreenVideo.current.srcObject = screen1
        }
    }, [screen1])



    return (
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, setStream, setStream1, name, setName, callEnded, me, callUser, leaveCall, answerCall, share, screen, myScreenVideo, userScreenVideo, startScreenShare, stopScreenSharing, screenAccepted, screenEnded, answerScreen }} >
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext }