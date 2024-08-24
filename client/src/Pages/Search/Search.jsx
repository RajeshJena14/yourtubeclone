import React from 'react'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar.jsx'
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid.jsx'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const Search = () => {
  const { Searchquery } = useParams();
  const vids = useSelector(s => s?.videoreducer)?.data?.filter(q => q?.videotitle.toUpperCase().includes(Searchquery?.toUpperCase()))
  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <Showvideogrid vids={vids} />
      </div>
    </div>
  )
}

export default Search