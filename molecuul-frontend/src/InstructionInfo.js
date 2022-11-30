import React from "react";

function InstructionInfo(props) {
    const handleClick = event => {
        props.clickTutorial();
    }

    return (
        <div className="instruction-info">
            <h1>Welcome to Molecuul!</h1>
            <b className="subtitle">A simulator for students by students</b>
            <p className="body1">- Use this simulator to help develop your basic understanding of molecules and bonds</p> 
            <p className="body2">- Start by clicking an element tile on the left</p>
            <p className="body2">- Lost? <button className="btn" onClick={handleClick}>click here for tutorial</button> </p>

            <p className="end-text">enjoy :) - Anthony Bui, Tyler Herzog, Daniel Leavitt, and Emelia Ortiz</p>
        </div>
    )

}

export default InstructionInfo;