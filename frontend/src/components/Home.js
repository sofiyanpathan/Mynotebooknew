import React from 'react'
import Notes from './Notes'

function Home(props) {
const{showalert}=props;

  return (
    <div className='container my-3'>
       <Notes showalert={showalert}/>
    </div>
  )
}

export default Home
