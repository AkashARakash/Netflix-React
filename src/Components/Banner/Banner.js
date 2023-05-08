import React, { useEffect, useState } from 'react'
import {API_KEY , imageUrl} from '../../constants/Constants'
import axios from '../../axios'
import './Banner.css'
function Banner() {
  const [movie, setMovie] = useState([])
  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      const random =Math.floor(Math.random()*response.data.results.length)
      // console.log(response.data.results[1])
      setMovie(response.data.results[random])
    })
  },[])
  return (
    <div style= {{backgroundImage : `url(${imageUrl+movie.backdrop_path})`}} className='Banner'>
        <div className='content'>
            <h1 className='title'>{movie.title}</h1>
            <div className='banner_button'>
                <button className='button'>Play</button>
                <button className='button'>My List</button>
            </div>
            <h1 className='descripction'>{movie.overview}</h1>
        </div>
        <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner