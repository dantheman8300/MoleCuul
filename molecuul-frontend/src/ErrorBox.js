import React from 'react';
import "./ErrorBox.css";

function ErrorBox (props) {

  const allErrors = Object.entries(props.errors).map(([key, error]) => {
    console.log(key, error);
    const errorMessage = error.errorSpecificMessage || error.message;
    return (
        <li className="error-message" key={key}>{errorMessage}</li>
    );
  });

  // find specific error message of element id
  const specificError = (id) => {
    const errors = Object.entries(props.errors).map(([key, error]) => {
      console.log(error);
      console.log(` desired element id: ${id}`);
      console.log(` error element id: ${error.id}`);
      if (error.id === id) {
        const errorMessage = error.errorSpecificMessage || error.message;
        return (
            <li className="error-message" key={key}>{errorMessage}</li>
        );
      }
      else {
        return null
      }
    });

    console.log(errors);
    return errors;
  }

  return (
    <div className="error-box">
      <ol>
        {(props.elementId === undefined) && allErrors}
        {(props.elementId !== undefined) && specificError(props.elementId)}
      </ol>
    </div>
  )
}

export default ErrorBox;
