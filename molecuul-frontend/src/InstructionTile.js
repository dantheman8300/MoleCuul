import React, {useState} from "react";
import infoIcon from "./icons/icon-information.png";
import InstructionInfo from "./InstructionInfo";
function InstructionTile(props) {
    const [isOpen, setOpen] = useState(false);
    const handleClick = event => {
        setOpen(current => !current);
    }

    const tutorialClick = event => {
        handleClick();
        props.handleTutorial();
    }



    return (
        <div className="instruction-tile">
            <img className="icon" src={infoIcon} alt='icon info' onClick={handleClick}/>
            {isOpen && <InstructionInfo clickTutorial={tutorialClick}/>}
            

        </div>
    )
}

export default InstructionTile;