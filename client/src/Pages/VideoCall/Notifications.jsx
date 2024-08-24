import React, { useContext } from 'react';
import { SocketContext } from '../../Context.js';
import './Notf.css'

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className='notf'>
          <h1>{call.name} is calling:</h1>
          <button onClick={answerCall} className='btn'>
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;