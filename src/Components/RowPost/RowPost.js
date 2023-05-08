import React, { useState , useEffect} from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import {imageUrl,API_KEY} from '../../constants/Constants'

import axios from '../../axios'

function RowPost(props) {
  const [movie , setMovie] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovie(response.data.results)
    // }).catch(err=>{
    //   alert('error')
    })
  },[] )

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('Array empty')
      }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movie.map((obj)=>

          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallposter': 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
          )}
        </div>
        { urlId && <Youtube opts={opts} videoId={urlId.key} />  }
    </div>
  )
}

export default RowPost