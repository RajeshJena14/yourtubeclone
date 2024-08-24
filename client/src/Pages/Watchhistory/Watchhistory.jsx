import React from 'react'
import WHL from '../../Component/WHL/WHL.jsx'
import { useSelector } from 'react-redux'
const Watchhistory = () => {
  const watchhistoryvideolist = useSelector(s => s.historyreducer)
  return (
    <WHL page={"History"} videolist={watchhistoryvideolist} />
  )
}

export default Watchhistory