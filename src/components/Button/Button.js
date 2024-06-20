import React from "react";
import "./Button.css";

const Button = ({
    children,
    onClick, 
    className
}) => {
    return (
        <button className={`btn ${className ? className : ''}`} onClick={() => { onClick() }}
            ><span>{children}</span>
        </button>
    )
}

export default Button;