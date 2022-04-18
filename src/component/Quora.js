import React from 'react' ;
import '../css/Quora.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Feed from './Feed';


function Quora(){
    return (
        <div className = "quora"> 
        <Navbar />
        <div className='quora__content'>
            <Sidebar />
            <Feed />
        </div>
        </div>
        
    )
}

export default Quora