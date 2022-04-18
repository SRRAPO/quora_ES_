import React, { useState } from 'react' ;
import '../css/Navbar.css';
import HomeIcon from '@material-ui/icons/Home';
import  FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import  Avatar from '@material-ui/core/Avatar';
import  LanguageIcon  from '@material-ui/icons/Language';
import  Button  from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import Modal from "react-modal";
import firebase from 'firebase';
//import ReactDOM from "react-dom/client";
import { ExpandMore } from "@material-ui/icons";
import { Input } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

Modal.setAppElement("#root");



function Navbar() { 
    
    const user = useSelector(selectUser)
    const [openModal,setOpenModal]=useState(false)
    const [input, setInput] =useState("")
    const [inputUrl, setInputUrl]=useState("")
    const [contactModal, setContactModal]=useState(false)
    const [inputC, setInputC] = useState("")

    const handleQuestion = (e) => {
        e.preventDefault()
    
        setOpenModal(false)
        db.collection('questions').add({
          question: input,
          imageUrl: inputUrl,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user 
        });
        setInput("")
        setInputUrl("")
      };
    
    
    
      const handleContact = (e) => {
        e.preventDefault()
    
        setContactModal(false)
    
        if(inputC===""){
          window.alert("Please enter some feedback...");
                setContactModal(true);
        }
        else{
    
        db.collection('contact').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user,
          feedback: inputC,
        });
        setInputC("")
        window.alert("Query sent! Thank you!");
      }
        
      };
  

    return ( 
       <div className="qHeader"> 
       
       <div className='qHeader__logo'>
           <img src='https://1635225677.rsc.cdn77.org/images/quora-app.jpg' alt="" />
        </div>   
           <div className='qHeader__icons'>
               <div className='qHeader__icon'>
                   <HomeIcon />

                   
                   </div>
                   
                 
               
                   </div>
                   <div className='qHeader__input'>
                       <SearchIcon />
                       <input type="text" placeholder="search quora" />
                        </div>  
                    <div  className='qHeader__Rem'>
                        <div className='qHeader__avatar'>
                            <Avatar 
                              src ={user.photo} />
                              
                        </div>
                        
                        <Button onClick={() => setOpenModal(true)}>Add Question</Button>
                        <Button onClick={() => auth.signOut()}> Logout</Button>
                        <Modal 
                        isOpen ={openModal}
                        onRequestClose ={() => setOpenModal(false)}
                        shouldCloseOnOverlayClick={false}
                        style={{
                            overlay: {
                              width: 700,
                              height: 600,
                              backgroundColor: "rgba(0,0,0,0.8)",
                              zIndex: "1000",
                              top: "50%",
                              left: "50%",
                              marginTop: "-300px",
                              marginLeft: "-350px",
                            },
                          }}
                        >
                            <div className='modal__title'>
                                <h5>Add Question</h5>
                                <h5>Share Link</h5>
                               
                                <div className='modal__info'>
                                <Avatar
              className="avatar"
              src={
                user.photo
                  ? user.photo
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <p>{user.disPlayName ? user.disPlayName : user.email} asked</p>
            <div className="modal__scope">
              <PeopleAltOutlinedIcon />
              <p>Public</p>
              <ExpandMore />

                                </div>
                                </div>
            <div className="modal__Field">
            <Input
            required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc. "
            />
            <div className="modal__fieldLink">
              <LinkIcon />
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>
          </div>
          <div className="modal__buttons">

                                <button className='cancel' onClick = {()=> setOpenModal(false)}>cancel </button>
                                <button type ="submit" onClick={handleQuestion} className="add">
                                    Add question
                                </button>
                            </div>
                            </div>

                        </Modal>
                    </div>
        </div>
    );
  }
export default Navbar;