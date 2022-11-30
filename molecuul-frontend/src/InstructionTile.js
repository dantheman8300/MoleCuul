import React, {useState} from "react";
import infoIcon from "./icons/icon-info.svg";
import InstructionInfo from "./InstructionInfo";

function InstructionTile() {
    const [isOpen, setOpen] = useState(false);
    const handleClick = event => {
        setOpen(current => !current);
    }

    return (
        <div className="instruction-tile">
            <img className="info-icon" src={infoIcon} alt='icon info' onClick={handleClick}/>
            {isOpen && <InstructionInfo />}
        </div>
    )
}

export default InstructionTile;