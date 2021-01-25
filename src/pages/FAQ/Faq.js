import React,{useState,useEffect} from 'react'
import classes from './Faq.module.css'
import {Accordion,Card,Button} from 'react-bootstrap'
import {ArrowBackIosRounded} from '@material-ui/icons'
import {auth} from '../../firebase'
import Icon from '../../components/Icon/Icon'
import IconClick from '../iconClick/iconClick'
import {useAuth} from '../../components/AuthProvider'
function Faq(props) {
    const [showIconClick,setIconClick]=useState(false);
    const [currentuser,setCurrent]=useState([])
    const {currentUser}=useAuth()
    const [dispname,setName]=useState('');
    const setShowHandler=()=>{
        props.history.replace('/home')
    
    }
    useEffect(()=>{
        setCurrent(currentUser)
        
        },[currentUser])
    useEffect(()=>{
        var avataricon=JSON.parse(localStorage.getItem("currentuser"))
        setName(avataricon.displayName[0]);
        
      },[])
      const signouthandler=()=>{
        auth.signOut()
        .then(()=>{
         
          props.history.replace("/login")
        })
      }
    return (
        <React.Fragment>
           
<Icon dispname={dispname} setIconClick={setIconClick} showIconClick={showIconClick}/>
{showIconClick? 
   <IconClick signout={signouthandler} useremail={currentuser.email}/>
   
   :null}
          
      
         <h3 className={classes.heading}>Frequently asked Questions</h3>
         <Button className={classes.btn2} onClick={setShowHandler}><ArrowBackIosRounded/> </Button>
         <div className={classes.faqdiv}>
         <Accordion className={classes.accordion}>
  <Card className={classes.card}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
       I forgot my Customer help desk password. How to recover ?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Sed in urna mollis, posuere libero vel, varius erat. In non iaculis nisl, eget ultricies odio. Nam laoreet purus ac magna gravida, ac porta justo pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sollicitudin sem ac lacus mattis accumsan eget quis leo.
           Morbi et porta nunc, eu iaculis nunc. Vestibulum eleifend lectus in velit posuere consequat.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card className={classes.card}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante lectus?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Sed in urna mollis, posuere libero vel, varius erat. In non iaculis nisl, eget ultricies odio. Nam laoreet purus ac magna gravida, ac porta justo pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sollicitudin sem ac lacus mattis accumsan eget quis leo. 
          Morbi et porta nunc, eu iaculis nunc. Vestibulum eleifend lectus in velit posuere consequat.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card className={classes.card}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante lectus?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="2">
      <Card.Body> accumsan eget quis leo. Morbi et porta nunc, eu iaculis nunc. Vestibulum eleifend lectus in velit posuer</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card className={classes.card}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="3">
      Proin accumsan dolor pellentesque tortor mollis, consectetur ultricies neque ullamcorper. Aliquam sed odio sed ex sodales ullamcorper?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body>Nulla sit amet lacus eu velit gravida tincidunt. Ut ullamcorper nisl ac fringilla rhoncus. Mauris consectetur auctor est eget sodales. In auctor sapi</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card className={classes.card}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="4">
      accumsan eget quis leo. Morbi et porta nunc, eu iaculis nunc. Vestibulum eleifend lectus in velit?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="4">
      <Card.Body>Nulla sit amet lacus eu velit gravida tincidunt. Ut ullamcorper nisl ac fringilla rhoncus. Mauris consectetur auctor est eget sodales. In auctor sapien a dui dictum vestibulum.
           Mauris ut justo lorem. Cras fringilla ante velit, consequat malesuada ipsum dapibus et. Integer laore</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
         </div>
         </React.Fragment>
    )
}

export default Faq
