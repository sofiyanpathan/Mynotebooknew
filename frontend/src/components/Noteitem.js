import React,{useContext} from "react";
import Notecontext from '../context/notes/Notecontext'

function Noteitem(props) {
  const context=useContext(Notecontext)//adding context from the context api
  const{deleteNote}=context;
  const { note,updatenote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title"> {note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
            props.showalert("Deleted Successfully","Success")}}></i>
            <i className="far fa-edit mx-2" onClick={()=>{updatenote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
