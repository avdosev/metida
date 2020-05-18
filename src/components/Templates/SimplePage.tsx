import React from "react";
import Header from "../Molecules/Header/Header";


export default function SimpleTemplate(props: { header: React.ReactNode; content: React.ReactNode; footer: React.ReactNode; }) {
    return (
        <>
            {props.header}
            {props.content}
            <footer>
                {props.footer}
            </footer>

        </>
    )
}