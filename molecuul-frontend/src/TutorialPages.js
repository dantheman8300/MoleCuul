import React from "react";
import PageZero from "./tutorial-pages/Page0";

function TutorialPages(props) {

    const pageNum = props.index;

    console.log(pageNum)
    
    const loadPage = (num) => {
        console.log("here ", pageNum)
        switch (num ) {
            case 0:
                return (
                    <PageZero />
                )

            case 1:
                break;

            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
        }
    }

    return (
        <div >
            {loadPage(pageNum)}
        </div>

    )

}

export default TutorialPages;