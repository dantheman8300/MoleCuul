import React, { useState } from "react";
import Arrow from "./Arrow";
import arrow from "./images/arrow.svg";
import leftArrow from './icons/left-arrow_2b05-fe0f.png';
import rightArrow from './icons/right-arrow_27a1-fe0f.png';
import appleX from './icons/cross-mark_274c.png';
import TutorialPages from "./TutorialPages";
import './Tutorial.css'



function Tutorial(props) {

    const [isHover, setHover] = useState(false)
    
    const closeText = () => {
        if(isHover) return 'x'
        else return 'close'
    }



    const handleHover = event => {
        setHover(current => !current)
    }





    return (
        <div className="tutorialScreen" style={{width: window.innerWidth, height: window.innerHeight}}>
            <div className="tutorialBox">
                {/* <button className="dir" onClick={decreaseCurInd}>prev</button>
                <button className="close" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={props.handleTutorial}>{closeText()}</button>
                <button className="dir" onClick={increaseCurInd}>next</button> */}

                <img className="close" src={leftArrow} onClick={props.decreaseCurInd} />
                <img className="close" src={appleX} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={props.handleTutorial}/>
                <img className="close" src={rightArrow} onClick={props.increaseCurInd} />
            </div>
            <TutorialPages index={props.index} increaseCurInd={props.increaseCurInd}/>

        </div>
    )

}

export default Tutorial;