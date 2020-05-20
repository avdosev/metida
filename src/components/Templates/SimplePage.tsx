import React from "react";


export default function SimpleTemplate(props: { header: React.ReactNode; content: React.ReactNode; footer?: React.ReactNode; }) {
    return (
        <>
            {props.header}
            {props.content}
            {props.footer}
        </>
    )
}