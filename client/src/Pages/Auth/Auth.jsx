import React, { useEffect, useRef } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { GoTrophy } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
import "./Auth.css"
import { useDispatch } from "react-redux"
import { setcurrentuser } from '../../action/currentuser.js';

const Auth = ({ user, setauthbtn, seteditcreatechanelbtn, count }) => {
    let pnts = useRef(user?.result.points)

    const dispatch = useDispatch()
    const logout = () => {
        localStorage.clear()
        dispatch(setcurrentuser(null))
        googleLogout()
    }

    useEffect(() => {
        pnts.current = pnts.current + 5 * count
        document.getElementById('user_points').innerHTML = `<GoTrophy /> User Points = ${pnts.current}`
    }, [count])

    return (
        <div className="Auth_container" onClick={() => setauthbtn(false)}>
            <div className="Auth_container2">
                <p className="User_Details">
                    <div className="Chanel_logo_App">
                        <p className="fstChar_logo_App">
                            {user?.result.name ? (
                                <>{user?.result.name.charAt(0).toUpperCase()}</>

                            ) : (
                                <>{user?.result.email.charAt(0).toUpperCase()}</>
                            )}
                        </p>
                    </div>
                    <div className="email_auth">{user?.result.email}</div>
                </p>
                <div className="btns_Auth">
                    {user?.result.name ? (
                        <>
                            {
                                <Link to={`/channel/${user?.result?._id}`} className='btn_Auth'>Your Channel</Link>
                            }
                        </>
                    ) : (
                        <>
                            <input type="submit" className='btn_Auth' value="Create Your Own Channel" onClick={() => seteditcreatechanelbtn(true)} />
                        </>
                    )}
                    <div className="user_points">
                        <p id='user_points'>
                            <GoTrophy /> User Points = {pnts.current}
                        </p>
                    </div>
                    <div>
                        <div className="btn_Auth" onClick={() => logout()}>
                            <BiLogOut />
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth