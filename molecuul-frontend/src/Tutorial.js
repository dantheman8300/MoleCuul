import React, { useState } from "react";
import Arrow from "./Arrow";
import TutorialPages from "./TutorialPages";



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
                <button className="dir" onClick={decreaseCurInd}>prev</button>
                <button className="close" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={props.handleTutorial}>{closeText()}</button>
                <button className="dir" onClick={increaseCurInd}>next</button>
            </div>
            <TutorialPages index={curInd}/>

        </div>
    )

}

export default Tutorial;