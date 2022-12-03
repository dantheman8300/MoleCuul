import React from "react";
import sparkle from './icons/sparkles_2728.png';
import smileyFace from './icons/smiling-face_263a-fe0f.png';
import './InstructionInfo.css'

function InstructionInfo(props) {
    const handleClick = event => {
        props.clickTutorial();
    }

    return (
        <div className="instruction-info">
            <h1 style={{textAlign:"center"}}><img className="sparkle" src={sparkle} alt='info sparkle emoji' /> Welcome to Molecuul! <img className="sparkle" src={sparkle} alt='info sparkle emoji' /></h1>
            <p className="subtitle"><b><i>A simulator for students by students</i></b></p>
            <p className="body2">- Use this simulator to help develop your basic understanding of molecules and bonds</p> 
            <p className="body2">- Lost? <button className="btn" onClick={handleClick}>click here for tutorial</button> </p>

            <p className="end-text">enjoy! <img className="smileyFace" src={smileyFace} alt='info smiley emoji' /> - Anthony Bui, Tyler Herzog, Daniel Leavitt, and Emelia Ortiz</p>
        </div>
    )
}

export default InstructionInfo;