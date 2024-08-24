import React, { useState, useContext } from 'react';
import { SocketContext } from '../../Context.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineAssignment, MdCall, MdPhoneDisabled } from 'react-icons/md'
import './Sidebar.css'

const Sidebar = ({ children }) => {
  const context = useContext(SocketContext)
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = context
  const [idToCall, setIdToCall] = useState('');
  console.log(me)

  return (
    <div className="container">
      <div className="paper1">
        <form className="root" autoComplete="off">
          <div className="gridContainer">
            <div className="padding">
              <div className='titleForm'>Account Info</div>
              <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <CopyToClipboard text={me} className="margin">
                <div className='align'>
                  <MdOutlineAssignment size={22} />
                  Copy Your ID
                </div>
              </CopyToClipboard>
            </div>
            <div className="padding">
              <div className='titleForm'>Make a call</div>
              <input placeholder="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} required />
              {callAccepted && !callEnded ? (
                <div onClick={leaveCall} className="margin1">
                  <MdPhoneDisabled size={22} />
                  Hang Up
                </div>
              ) : (
                <div onClick={() => callUser(idToCall)} className="margin">
                  <MdCall size={22} />
                  Call
                </div>
              )}
            </div>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;