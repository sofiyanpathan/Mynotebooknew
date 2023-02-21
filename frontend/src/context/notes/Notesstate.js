
import React,{useState} from "react";
import Notecontext from "./Notecontext";



const Notesstate=(props)=>{

    const host="http://localhost:5000"
    const notesinitial=[]

      const[notes,setnotes]=useState(notesinitial)
      //get all notes
      const getNotes=async ()=>{
        //Api call
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          }
        }); 
           const json=await response.json()
           console.log(json)
           setnotes(json)
    
        }
      
      //adding a note
      const addNote=async (title,description,tag)=>{
          //Api call
          const response=await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
              'content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          });
          const note=await response.json()
          setnotes(notes.concat(note))
      
          }
      // deleting a note
      const deleteNote=async(id)=>{
       //API CALL
       const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        
      });
       const json=response.json()
       console.log(json)

        const newnotes=notes.filter((note)=>{
          return note._id!==id
        })
        setnotes(newnotes)
      }

      //editing   a note
      const editNote=async(id,title,description,tag)=>{
        //API CALL
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        });
       
        const json= await response.json()
        console.log(json)

        let newnotes=JSON.parse(JSON.stringify(notes))
        //logic for editing the node
        for(let i=0;i<newnotes.length;i++){
          const element=newnotes[i]
          if(element._id===id){
            newnotes[i].title=title;
            newnotes[i].description=description;
            newnotes[i].tag=tag;
            break;
          }
        }
        setnotes(newnotes)
      }
      
      return(
      <Notecontext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
          {props.children}
      </Notecontext.Provider>
      )
}

export default Notesstate;