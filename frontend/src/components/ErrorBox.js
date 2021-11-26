import React from 'react'

function ErrorBox(props) {
    return (
        <div className="ErrorBox">
            {props.errorMessage}
        </div>
    )
}

export default ErrorBox
