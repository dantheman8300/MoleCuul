import React from "react";
import './FreeBuildPage.css'
import Canvas from "./Canvas";


function FreeBuildPage () {
  return (
    <div className="page" style={{height: '100vh'}}> 
      <div className='header'>
        header
      </div>
      <div className='sidebar'>
        sidebar
      </div>
      <div className="builder">
        <Canvas/>
      </div>
    </div>
  )
}

export default FreeBuildPage;