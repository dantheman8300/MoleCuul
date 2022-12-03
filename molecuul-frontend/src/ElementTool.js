import React from 'react';
import ConfigurationMenu from "./ConfigurationMenu";

/* square element on sidebar */
function ElementTool (props) {
    const octInfo = props.info;
    const ind = props.index;
    let isOpen = props.isOpen;
    //const [isOpen, setOpen] = useState(false);
    // const index = props.index;
    const image = props.info.tile;

    const handleClick = event => {
        // console.log(ind)
        isOpen = props.handleChange(ind);
    }

    // useEffect(() => {
    //     // props.handleChange(props.ind);
    //     console.log(isOpen)
    // });

    return (
        <div className='ElementTool'>
            <img id='elem-square' src={require(`./images/${image}.svg`)} alt='element tile' onClick={handleClick}  />
            {/* {console.log("info  ", octInfo)} */}
            {isOpen && <ConfigurationMenu openTutorial={props.openTutorial} curInd={props.curInd} increaseCurInd={props.increaseCurInd} info={octInfo} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd}
            setFocusMsg={props.setFocusMsg}/>}
        </div>
    )
}

export default ElementTool;

