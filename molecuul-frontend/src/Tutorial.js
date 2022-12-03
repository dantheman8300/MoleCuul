import React, { useState } from "react";
import leftArrow from './icons/left-arrow_2b05-fe0f.png';
import rightArrow from './icons/right-arrow_27a1-fe0f.png';
import appleX from './icons/cross-mark_274c.png';
import TutorialPages from "./TutorialPages";
import './Tutorial.css'

// component for tutorial
function Tutorial(props) {
    const [isHover, setHover] = useState(false)
    const handleHover = event => {
        setHover(!isHover)

    }
    
    return (
        <div className="tutorialScreen" style={{width: window.innerWidth, height: window.innerHeight}}>
            <div className="tutorialBox">
                <img className="close" src={leftArrow} onClick={props.decreaseCurInd} alt='tutorial prev button'/>
                <img className="close" src={appleX} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={props.handleTutorial} alt='tutorial close button'/>
                <img className="close" src={rightArrow} onClick={props.increaseCurInd} alt='tutorial next button'/>
            </div>
            <TutorialPages index={props.index} increaseCurInd={props.increaseCurInd}/>
        </div>
    )
}

export default Tutorial;