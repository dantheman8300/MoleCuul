import React from "react";
import PageZero from "./tutorial-pages/Page0";
import PageOne from "./tutorial-pages/Page1";
import PageTen from "./tutorial-pages/Page10";
import PageEleven from "./tutorial-pages/Page11";
import PageTwelve from "./tutorial-pages/page12";
import PageTwo from "./tutorial-pages/Page2";
import PageThree from "./tutorial-pages/Page3";
import PageFour from "./tutorial-pages/Page4";
import PageFive from "./tutorial-pages/Page5";
import PageSix from "./tutorial-pages/Page6";
import PageSeven from "./tutorial-pages/Page7";
import PageEight from "./tutorial-pages/Page8";
import PageNine from "./tutorial-pages/Page9";


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
                return (
                    <PageOne />
                )
            case 2:
                return (
                    <PageTwo />
                )
            case 3:
                return (
                    <PageThree />
                )
            case 4:
                return (
                    <PageFour />
                )
            case 5:
                return (
                    <PageFive />
                )
            case 6:
                return (
                    <PageSix />
                )
            case 7:
                return (
                    <PageSeven />
                )
            case 8:
                return (
                    <PageEight />
                )
            case 9:
                return (
                    <PageNine />
                )
            case 10:
                return (
                    <PageTen />
                )
            case 11:
                return (
                    <PageEleven />
                )
            case 12:
                return (
                    <PageTwelve />
                )
        }
    }

    return (
        <div >
            {loadPage(pageNum)}
        </div>

    )

}

export default TutorialPages;