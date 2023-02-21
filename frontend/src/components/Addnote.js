import React, { useContext, useState } from 'react'
import Notecontext from '../context/notes/Notecontext'

const Addnote = (props) => {
  
  const context=useContext(Notecontext)
  const{addNote}=context;
  const[note,setnotes]=useState({title:"",description:"",tag:""})
  
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setnotes({title:"",description:"",tag:""})
    props.showalert("Note added Succescfully","success")

  }
  const onChange=(e)=>{
    
    setnotes({...note,[e.target.name]:e.target.value})
 
  }
  return (
    <div className='container my-3'>
        <h2>Add a note</h2>
        <form className='my-3'>
              <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
               
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" value={note.description}name="description" onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tag">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
              </div>
              
              <button disabled={note.title.length<5 || note.description.length<5}type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div> 
  )
}

export default Addnote

