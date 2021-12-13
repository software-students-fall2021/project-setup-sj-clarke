import React from "react"
import "./groupExpand.css"

function groupExpand(props){
    return(
        <div className = "expandSection">
            <button className = "expand">
                <p className = "expandTitle">{props.title}</p>
            </button>
            <div className = "expandContent"></div>
            <div classname = "expandText"></div>
        </div>

    )
}