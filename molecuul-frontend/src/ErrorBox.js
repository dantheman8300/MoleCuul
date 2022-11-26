import React, {useState} from 'react';
import "./ErrorBox.css";

function ErrorBox (props) {

  const errors = Object.entries(props.errors).map(([key, error]) => {
    console.log(key, error);
    const errorMessage = error.errorSpecificMessage || error.message;
    return (
        <li className="error__message">{errorMessage}</li>
    );
  });

  return (
    <div className="error-box">
      <ol>
        {errors}
      </ol>
    </div>
  )
}

export default ErrorBox;
