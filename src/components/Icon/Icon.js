import React from 'react'
import {Avatar} from '@material-ui/core'
function Icon(props) {
    return (
        <div>
            <Avatar 
onClick={()=>props.setIconClick(!props.showIconClick)}
style={{position:'fixed',right:'0px',top:'0px',backgroundColor:'black',cursor:'pointer',textTransform:'capitalize'}}>{props.dispname}</Avatar>
        </div>
    )
}

export default Icon
