import React from "react";
import './FreeBuildPage.css'

function FreeBuildPage (props) {

  return (
    <div className="page" style={{height: '100vh'}}> 
      <div className='header'>
        {props.header}
      </div>
      <div className='sidebar-section'>
        {props.sidebar}
      </div>
      <div className="builder">
        {props.canvas}
      </div>
    </div>
  )
}

export default FreeBuildPage;