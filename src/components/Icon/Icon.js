import React from 'react'
import {Avatar} from '@material-ui/core'
function Icon(props) {
    return (
        <React.Fragment>
            <Avatar 
onClick={()=>props.setIconClick(!props.showIconClick)}
style={{position:'absolute',right:'0.5%',top:'0px',backgroundColor:'black',cursor:'pointer',textTransform:'capitalize'}}>{props.dispname}</Avatar>
       </React.Fragment>
    )
}

export default Icon
