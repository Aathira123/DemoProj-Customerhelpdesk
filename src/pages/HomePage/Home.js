import React,{useEffect,useState} from "react";
import {Card,CardGroup,Button} from 'react-bootstrap'
import classes from './Home.module.css'
import {useAuth} from '../../components/AuthProvider'
import {auth} from "../../firebase";
import {Avatar} from '@material-ui/core'
import TicketModal from '../Tickets/TicketModal/TicketModal'
import IconClick from '../iconClick/iconClick'
import {CSSTransition} from 'react-transition-group'
import 'react-slidedown/lib/slidedown.css'
import Icon from '../../components/Icon/Icon'
function Admin(props) {

const [currentuser,setCurrent]=useState([])
const [show, setShow] = useState(false);
const [showIconClick,setIconClick]=useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const {currentUser}=useAuth()
const [dispname,setName]=useState('');
useEffect(()=>{
setCurrent(currentUser)

},[currentUser])
useEffect(()=>{
  var avataricon=JSON.parse(localStorage.getItem("currentuser"))
  setName(avataricon.displayName[0]);
  
},[])

 const raiseTicket=()=>{
setShow(!show)



 }
const viewTicketHandler=()=>{
  props.history.push('/viewticket')
}

  const signouthandler=()=>{
    auth.signOut()
    .then(()=>{
      setCurrent('')
      props.history.replace("/login")
    })
  }
  
  return (
    <div style={{position:'relative'}}>
   

<Icon dispname={dispname} setIconClick={setIconClick} showIconClick={showIconClick}/>
   
   {showIconClick? 
   <IconClick signout={signouthandler} useremail={currentuser.email}/>
   
   :null}
  <CardGroup className={classes.cardgroup}>
  <Card className={classes.card} >
   
    <Card.Body className={classes.cardbody} onClick={raiseTicket}>
      <Card.Title>Raise a Complaint / Ticket</Card.Title>
      <Card.Text>
        Click to raise a ticket
      </Card.Text>
    </Card.Body>
  </Card>


  <Card className={classes.card}>
    <Card.Body className={classes.cardbody}>
      <Card.Title>Check Ticket Status</Card.Title>
      <Card.Text>
       Click to view your ticket status
      </Card.Text>
    </Card.Body>
  </Card>


  <Card className={classes.card} onClick={viewTicketHandler}>
   <Card.Body className={classes.cardbody}>
      <Card.Title>View All Tickets</Card.Title>
      <Card.Text>
      Click to view tickets
       </Card.Text>
    </Card.Body>
  </Card>

  
</CardGroup>
<div>
{show && <TicketModal handleClose={handleClose} handleShow={handleShow} show={show} setShow={setShow} />}

</div>
</div>
  )
}

export default Admin;