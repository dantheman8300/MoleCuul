import React, {useState} from "react";
import infoIcon from "./icons/icon-information.png";
import InstructionInfo from "./InstructionInfo";
function InstructionTile(props) {
    const [isOpen, setOpen] = useState(false);
    const handleClick = event => {
        setOpen(current => !current);
                
        props.setFocusMsg(false);
    }

    const tutorialClick = event => {
        handleClick();
        props.handleTutorial();
                
        props.setFocusMsg(false);

    }

    return (
        <div className="instruction-tile">
            <img className="icon" src={infoIcon} alt='icon info' onClick={handleClick}/>
            {isOpen && <InstructionInfo clickTutorial={tutorialClick}/>}
        </div>
    )
}

export default InstructionTile;