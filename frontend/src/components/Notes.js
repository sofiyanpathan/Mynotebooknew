import React, { useContext, useEffect, useRef,useState } from "react";
import Notecontext from "../context/notes/Notecontext";
import Addnote from "./Addnote";

import Noteitem from "./Noteitem";
import {useNavigate} from 'react-router-dom'
function Notes(props) {
  let navigate=useNavigate()
  const context = useContext(Notecontext);
  const { notes, getNotes,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
      console.log(localStorage.getItem('token'))
    }
    else{
      navigate("/login")
    }
 
    // react-hooks/exhaustive-deps
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const[note,setnotes]=useState({id:"",etitle:"",edescription:"",etag:""})
  const updatenote = (currentnote) => {
    ref.current.click()
    setnotes({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  }
 
  
  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showalert("Note Updated Successfully","success")
  }
  const onChange=(e)=>{
    
    setnotes({...note,[e.target.name]:e.target.value})
 
  }
  
  return (
    <>
      <Addnote showalert={props.showalert}/>


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Launch demo modal
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                        
                                    </div>
                                    <div className="modal-body">
                                        <form className="my-3">
                                            <div className="mb-3">
                                                <label htmlFor="title" className="form-label">Title</label>
                                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="tag" className="form-label">Tag</label>
                                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                            </div>

                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                                    </div>
                                </div>
                            </div>
                        </div>

     
      <div>
        <h2>Your Notes</h2>
        <div className="row my-3 ">
          <div className="mx-4">
          {notes.length===0 && "No Notes to display"}
          </div>
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} updatenote={updatenote} showalert={props.showalert} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
