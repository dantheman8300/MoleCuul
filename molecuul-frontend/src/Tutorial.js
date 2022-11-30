import React, { useState } from "react";
import Arrow from "./Arrow";
import arrow from "./images/arrow.svg";
import leftArrow from './icons/left-arrow_2b05-fe0f.png';
import rightArrow from './icons/right-arrow_27a1-fe0f.png';
import appleX from './icons/cross-mark_274c.png';



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
                {/* <button className="dir">prev</button> */}
                <img src={leftArrow} alt="left arrow" className="dir" />
                {/* <button className="close" onMouseEnter={handleHover} onMouseLeave={handleHover}>{closeText()}</button> */}
                <img src={appleX} alt="close" className="close" onMouseEnter={handleHover} onMouseLeave={handleHover} />
                {/* <button className="dir" onClick={handleOne}>next</button> */}
                <img src={rightArrow} alt="right arrow" className="dir" onClick={handleOne} />
            </div>
            <Arrow />
            
            <img src={arrow} alt="arrow img" className="arrow"/>
        </div>
    )

}

export default Tutorial;