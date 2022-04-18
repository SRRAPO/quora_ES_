import React from "react";
import '../css/SidebarOptions.css';
import Add from '@material-ui/icons/Add';




function SidebarOptions() {
  return ( 
     <div className="sidebarOptions"> 
   
     <div className="sidebarOption">
         <img 
         src="https://cdn.mos.cms.futurecdn.net/HFUAjfbamNhbM8dsNSQW3D.jpg"
         alt=""
         />
         <p>Technology</p>

     </div>
     <div className="sidebarOption">
         <img 
         src="https://assets.skyfilabs.com/images/blog/eceminiproject.jpg"
         alt=""
         />
         <p>ECE</p>

     </div>
    

    
     <div className="sidebarOption">
         <img 
         src="https://engineering.nyu.edu/sites/default/files/styles/content_header_default_1x/public/2018-03/program-comp-sci.jpg?h=e1d1bc8a&itok=-xmP6Hjw"
         alt=""
         />
         <p>CSE</p>

     </div>
     <div className="sidebarOption">
         <img 
         src="https://images.shiksha.com/mediadata/images/articles/1568628323phplcvsyh.jpeg"
         alt=""
         />
         <p>MECHANICAL</p>

     </div>
     
    

   
   

     
     <div className="sidebarOption">
         <img 
         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-jBK9AGEJxIaAquf5XHouo0LBjg9hXx_sn2A82FgumUuxhVKc1_bCAtPsSGBG6VjRCc&usqp=CAU"
         alt=""
         />
         <p>CIVIL</p>

     </div>
     <div className="sidebarOption">
         <Add />
         <p className="text">Discover Spaces</p>
     </div>

      
     
    </div>
  );
}

export default SidebarOptions;