import React from 'react';
import '../css/Post.css';
import '../css/Navbar.css';
import  { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import  ArrowDownwardOutlinedIcon from  '@material-ui/icons/ArrowDownwardOutlined'
import  ArrowUpwardOutlinedIcon from  '@material-ui/icons/ArrowUpwardOutlined'
import  RepeatOutlinedIcon  from '@material-ui/icons/RepeatOutlined'
import  ChatBubbleOutlineOutlinedIcon  from '@material-ui/icons/ChatBubbleOutlineOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import  MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Modal from "react-modal";
import db from "../firebase";
//import { selectQuestionId } from "../features/questionSlice";
import firebase from "firebase";
import { selectQuestionId, selectQuestionName, setQuestionInfo } from '../features/questionSlice';

//Modal.setAppElement("root");


function Post({ Id,question,image,timestamp,users}) {

    const user=useSelector(selectUser)
    const [openModal , setOpenModal]= useState(false)
    const dispatch = useDispatch()

    const questionId = useSelector(selectQuestionId)
    const questionName =useSelector(selectQuestionName)
    const [answer, setAnswer] = useState("")
    const [getAnswer ,setGetAnswer]= useState([])
    
    useEffect(() => {
      let mounted = true;
      if (questionId) {
        db.collection("questions")
          .doc(questionId)
          .collection("answer")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            if (mounted) {
              setGetAnswer(
                snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
              );
            }
          });
      }
  
      return () => (mounted = false);
    }, [questionId]);

    const handleAnswer=(e)=>{
        e.preventDefault()

        if(questionId){
            db.collection('questions').doc(questionId).collection('answer')
            .add({
                questionId: questionId,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                answer:answer,
                user:user
            })
            console.log(questionId,questionName)
            setAnswer("")
            setOpenModal(false)
        }
    }

    
    
    return(
        <div className='post' 
        onClick={() => dispatch(setQuestionInfo({ 
            questionId :Id,
            questionName :question,
        }))}>
            <div className='post__info'>
                <Avatar
                    src={users.photo} />
                <h5>{users.displayName ? users.displayName : users.email}</h5>


            </div>
            <div className='post__body'>
                <div className='post__question'>
                    <p>{question}</p>
                    <button onClick={() => setOpenModal(true)} className='post__btnAnswer'>Answer</button>
                    <Modal
                        isOpen={openModal}
                        onRequestClose={() => setOpenModal(false)}
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
                        <div className='modal__question'>
                            <h1>{question}</h1>
                            <p>
                                asked by <span className='name'>{users.displayName ? users.displayName : users.email}</span> {""}
                                
                            </p>
                            </div>
                            

                            <div className='modal__answer'>
                                <textarea 
                                required
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder='enter your answer' type ='text' />


                            </div>
                        
                        <div className="modal__buttons">

                            <button className='cancel' onClick={() => setOpenModal(false)}>cancel </button>
                            <button onClick={handleAnswer} type="submit"  className="add">
                                Add Answer
                            </button>
                        </div>
               

            </Modal>
        </div><div className='post__answer'>
        {getAnswer.map(({ id, answers }) => (
            <p key={id} 
            style={{ position: "relative", paddingBottom: "5px" }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "red",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}
                      on{" "}
                      
                     
                    </span><br />
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
          
            </div><img src={image} 
                alt="" /><div className='post__footer'>

                <div className='post__footerAction'>
                    
                    <ArrowUpwardOutlinedIcon   />
                       
                   
                    <ArrowDownwardOutlinedIcon />
                    
                </div>
                
            </div>

        </div>
        </div>
    )
}
export default Post