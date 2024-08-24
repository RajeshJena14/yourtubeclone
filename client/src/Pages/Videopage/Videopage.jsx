import React, { useEffect, useRef, useState } from 'react'
import "./Videopage.css"
import moment from 'moment'
import Likewatchlatersavebtns from './Likewatchlatersavebtns.jsx'
import { useParams, Link } from 'react-router-dom'
import Comment from '../../Component/Comment/Comment.jsx'
import { viewvideo } from '../../action/video.js'
import { addtohistory } from '../../action/history.js'
import { useSelector, useDispatch } from 'react-redux'
import { userpoint } from '../../action/channeluser.js'
import LocTemp from '../LocationTemp/LocTemp.jsx';


const Videopage = ({ setUsp, setcloseApp }) => {
    const { vid } = useParams();
    const dispatch = useDispatch()
    const vids = useSelector((state) => state.videoreducer)
    const [vv, setvv] = useState(vids?.data?.filter((q) => q._id === vid)[0])
    const [threeTap, setThreeTap] = useState(false)
    useEffect(() => {
        if (threeTap) {
            for (let i = 0; i < allvids.length; i++) {
                if (allvids[i]._id === vv?._id) {
                    if (i === allvids.length - 1) {
                        setvv(allvids[0])
                    }
                    else {
                        setvv(allvids[i + 1])
                    }
                }
            }
        }
        setThreeTap(false)
    })
    const allvids = vids?.data?.filter((q) => q)

    const currentuser = useSelector(state => state.currentuserreducer)

    const handleviews = () => {
        dispatch(viewvideo({ id: vid }))
    }
    const handlehistory = () => {
        dispatch(addtohistory({
            videoid: vid,
            viewer: currentuser?.result._id,
        }))
    }
    const updatePoints = async () => {
        alert("User Awarded +5 points")
        setUsp(true)
        dispatch(userpoint({ id: currentuser?.result._id }))
    }
    useEffect(() => {
        if (currentuser) {
            handlehistory()
        }
        handleviews()
    }, [])
    useEffect(() => {
        const videoControl = document.getElementById('myvideo')
        videoControl.addEventListener("ended", updatePoints)
    }, [currentuser?.result.points, dispatch])


    // Custom Video Contols
    const [locbtn, setlocbtn] = useState(false)
    const videoWidth = useRef(null)
    const controlHeight = useRef(null)
    useEffect(() => {
        controlHeight.current = document.getElementById('user_control').clientHeight
    }, [controlHeight.current])
    useEffect(() => {
        videoWidth.current = document.getElementById('myvideo').clientWidth
        document.getElementById('user_control').addEventListener("mousedown", playbackStart)
        document.getElementById('user_control').addEventListener("mouseup", playbackStop)
        document.getElementById('user_control').addEventListener("click", handletaps)
        document.getElementById('user_control').addEventListener("dblclick", handletwotap)
    }, [])

    function playbackStop() {
        document.getElementById('myvideo').playbackRate = 1
    }
    function playbackStart(event) {
        if (event.clientX > (videoWidth.current) * 0.75) {
            document.getElementById('myvideo').playbackRate = 2
        }
        else if (event.clientX < (videoWidth.current) * 0.4) {
            document.getElementById('myvideo').playbackRate = 0.25
        }
        else {
            document.getElementById('myvideo').playbackRate = 1
        }
    }
    function handletwotap(event) {
        if (event.clientX > (videoWidth.current) * 0.75) {
            document.getElementById('myvideo').currentTime += 10
        }
        else if (event.clientX < (videoWidth.current) * 0.4) {
            document.getElementById('myvideo').currentTime -= 10
        }
    }
    function handletaps(event) {
        if (event.detail === 1) {
            if (event.clientX < (videoWidth.current) * 0.6 && event.clientX > (videoWidth.current) * 0.4) {
                (document.getElementById('myvideo').paused || document.getElementById('myvideo').ended) ? document.getElementById('myvideo').play() : document.getElementById('myvideo').pause()
            }
            else if (event.clientX > (videoWidth.current) * 0.75 && event.clientY < (controlHeight.current) * 0.4) {
                setlocbtn(true)
            }
        }
        else if (event.detail === 3) {
            if (event.clientX > (videoWidth.current) * 0.8) {
                setcloseApp(true)
            }
            else if (event.clientX < (videoWidth.current) * 0.3) {
                document.getElementById('container').scroll({
                    top: document.getElementById("cmnt").offsetTop,
                    behavior: "smooth"
                })
            }
            else if (event.clientX < (videoWidth.current) * 0.6 && event.clientX > (videoWidth.current) * 0.4) {
                setThreeTap(true)
            }
        }
    }

    return (
        <>
            <div className="container_videoPage" id='container'>
                <div className="container2_videoPage">
                    <div className="video_display_screen_videoPage">
                        <video src={`https://yourtubeclone-1.onrender.com/${vv?.filepath}`} className="video_ShowVideo_videoPage" id='myvideo' controls>
                        </video>
                        <div className="control_box" id='user_control'></div>
                        <div className="video_details_videoPage">
                            <div className="video_btns_title_VideoPage_cont">
                                <p className="video_title_VideoPage">{vv?.title}</p>
                                <div className="views_date_btns_VideoPage">
                                    <div className="views_videoPage">
                                        {vv?.views} views <div className="dot"></div>{" "}
                                        {moment(vv?.createdat).fromNow()}
                                    </div>
                                    <Likewatchlatersavebtns vv={vv} vid={vid} />
                                </div>
                            </div>
                            <Link to={'/'} className='chanel_details_videoPage'>
                                <b className="chanel_logo_videoPage">
                                    <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                                </b>
                                <p className="chanel_name_videoPage">{vv?.uploader}</p>
                            </Link>
                            <div className="comments_VideoPage" id='cmnt'>
                                <h2>
                                    <u>Comments</u>
                                </h2>
                                <Comment videoid={vv?._id} />
                            </div>
                        </div>
                    </div>
                    <div className="moreVideoBar">More videos</div>
                </div>
            </div>
            {
                locbtn && <LocTemp setlocbtn={setlocbtn} />
            }
        </>
    )
}

export default Videopage