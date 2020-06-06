import React, {Suspense} from "react";
import styles from "./SimpleTempate.module.css"


export default function SimpleTemplate(props: { header: React.ReactNode; content: React.ReactNode; footer?: React.ReactNode; }) {
    return (

        <div className={styles.template}>
            {/*{props.header}*/}
            {props.content}
                {props.footer}
        </div>
    )
}