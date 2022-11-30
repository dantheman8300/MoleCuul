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
    const [curInd, setCurInd] = useState(0)
    
    const closeText = () => {
        if(isHover) return 'x'
        else return 'close'
    }



    const handleHover = event => {
        setHover(current => !current)
    }


    const increaseCurInd = () => {
        if(curInd + 1 > 3) {
            setCurInd(0)
        }
        else {  
            setCurInd(curInd + 1)
            console.log(curInd)
        }
    }

    const decreaseCurInd = () => {
        if(curInd  - 1 < 0) {
            setCurInd(3)
        }
        else {  
            
        setCurInd(curInd - 1)
        }
    }


    return (
        <div className="tutorialScreen" style={{width: window.innerWidth, height: window.innerHeight}}>
            <div className="tutorialBox">
                {/* <button className="dir" onClick={decreaseCurInd}>prev</button>
                <button className="close" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={props.handleTutorial}>{closeText()}</button>
                <button className="dir" onClick={increaseCurInd}>next</button> */}

                <img className="close" src={leftArrow} onClick={decreaseCurInd} />
                <img className="close" src={appleX} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={props.handleTutorial} />
                <img className="close" src={rightArrow} onClick={increaseCurInd} />
            </div>
            <TutorialPages index={curInd}/>

        </div>
    )

}

export default Tutorial;