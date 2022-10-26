import React, { useState } from 'react';


function Molecule(elements) {
    const [elements, setElements] = useState([]);
    const [openNodes, setNodes] = useState(0);


// Removes a single element at specified index from molecule
function removeElement(index) {
    const newMolecule = elements.filter((element, i) => {
        return i !== index
    });
    setElements(newMolecule);
    // TODO: update list of open nodes on molecule
}

// Adds element into molecule model
function addElement(element) {
    setElements([...elements, element]);
    // TODO: update list of open nodes on molecule
}

}

// lStructure refers to an array representing the lewis structure and bonds is an array of elements it is bonded with
const Element = (name, lStructure, bonds) => { return {name: name, lStructure: lStructure, bonds: bonds } }
