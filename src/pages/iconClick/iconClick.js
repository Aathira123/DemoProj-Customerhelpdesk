import React from 'react'
import styles from './iconClick.module.css'
const iconClick=(props)=> {
    return (
        <div className={styles.wrap}>
         <ul>
             <li className={styles.sidetoggle}>{props.useremail}</li>
             <li className={styles.sidetoggle} onClick={props.signout}>Sign out</li>
             
         </ul>
        </div>
    )
}

export default iconClick
