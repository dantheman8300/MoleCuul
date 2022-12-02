
import React, {useState} from "react";
import Sidebar from "./Sidebar";
import FreeBuildPage from "./FreeBuildPage.js";
import Canvas from "./Canvas";
import Header from "./Header";
import './Tutorial.css';
import Tutorial from './Tutorial';

function App() {

    // Create state to hold the currently selected element from sidebar
    const [selectedElement, setSelectedElement] = useState(null);
    const [hover, setHover] = useState(false);
    
    const [openTutorial, setTutorial] = useState(false);
    
  const [focusMsg, setFocusMsg] = useState(false);




    
    const [curInd, setCurInd] = useState(0)
    const increaseCurInd = () => {
        if(curInd + 1 > 16) {
            setCurInd(0)
        }
        else {  
            setCurInd(curInd + 1)
            console.log(curInd)
        }
    }

    const decreaseCurInd = () => {
        if(curInd  - 1 < 0) {
            setCurInd(16)
        }
        else {  
            
        setCurInd(curInd - 1)
        }
    }

    // const [rotation, setRotation] = React.useState(0);






    const handleElementDragStart = (elementInfo) => {
        console.log(`Drag started for ${elementInfo}`);
        setSelectedElement(elementInfo);
        setHover(true);
    }

    const handleElementDragEnd = () => {
        setHover(false);
        setSelectedElement(null);
    }

    const handleTutorial = event => {
        setTutorial(current => !current)

        if(curInd === 16) {
            setCurInd(0)
        }
    }

    // const handleElementRotation = (rotator) => {
    //     console.log(`Rotation changed to ${rotation}`);
    //     if (rotation === 0) {
    //         setRotation(0);
    //     } else {
    //         setRotation(rotation + rotator);
    //     }
    // }


    // const lst = [
    //     "CH4",
    //     "C2H6",
    //     "CO2",
    //     "H2O",
    //     "CH2O",
    //     "C2H2",
    //     "C2H4O",
    //     "CH3OH"
    // ]
    return (
        <div className="container">
            <FreeBuildPage 
            sidebar = {
                <Sidebar 
                    handleDragStart={handleElementDragStart}
                    handleDragEnd={handleElementDragEnd}
                    // handleRotation={handleElementRotation}
                    openTutorial={openTutorial}
                    curInd={curInd} increaseCurInd={increaseCurInd}
                    setFocusMsg={setFocusMsg} focusMsg={focusMsg}
                />
            }
            canvas = {<Canvas selectedElement={selectedElement} hover={hover} 
            handleDragStart={handleElementDragStart} handleDragEnd={handleElementDragEnd} handleTutorial={handleTutorial} openTutorial={openTutorial}
            curInd={curInd} increaseCurInd={increaseCurInd} 
            setFocusMsg={setFocusMsg} focusMsg={focusMsg}/>}
            header = {<Header />}
            
            />
            
         {openTutorial && <Tutorial handleTutorial={handleTutorial} index={curInd} increaseCurInd={increaseCurInd} decreaseCurInd={decreaseCurInd}/>}

        </div>
    )
}

export default App;