import React, { useState } from "react";
import Arrow from "./Arrow";


function Tutorial() {

    const [isHover, setHover] = useState(false)
    const [isOne, setOne] = useState(false)
    const [isTwo, setTwo] = useState(false)

    const handleOne = event => {
        setOne(current => !current)
    }
    
    const closeText = () => {
        if(isHover) return 'x'
        else return 'close'
    }

    const handleHover = event => {
        setHover(current => !current)
    }

    return (
        <div className="tutorialScreen">
            <div className="tutorialBox">
                <button className="dir">prev</button>
                <button className="close" onMouseEnter={handleHover} onMouseLeave={handleHover}>{closeText()}</button>
                <button className="dir" onClick={handleOne}>next</button>
            </div>
            <Arrow onClick={handleOne}/>
        </div>
    )

}

export default Tutorial;