import React from 'react'
import {Avatar} from '@material-ui/core'
import classes from './Icon.module.css';
function Icon(props) {
    return (
        <div className={classes.avatardiv}>

            <Avatar 
onClick={()=>props.setIconClick(!props.showIconClick)}
className={classes.avatar}
>{props.dispname}</Avatar>
       </div>
    )
}

export default Icon
