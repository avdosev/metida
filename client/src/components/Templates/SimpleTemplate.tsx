import React from "react";
import "./style.css"

export default function SimpleTemplate(props: { header: React.ReactNode; content: React.ReactNode; footer?: React.ReactNode; }) {
    return (
        <div className="template">
            {props.header}
            {props.content}
            {props.footer}
        </div>
    )
}