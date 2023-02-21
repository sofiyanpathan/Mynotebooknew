import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useState} from 'react'
import Alert from "./components/Alert";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notesstate from "./context/notes/Notesstate";
function App() {
  const[alert,setalert]=useState(null)
  const showalert=(message,type,color)=>{
    setalert({
      msg:message,
      type:type,
     
    })
    setTimeout(()=>{setalert(null)},1500);
  }
  return (
    <>
      <Notesstate>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="conatiner">
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert}/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showalert={showalert}/>}></Route>
              <Route exact path="/signup" element={<Signup showalert={showalert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </Notesstate>
    </>
  );
}

export default App;
