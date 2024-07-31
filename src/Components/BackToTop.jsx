import React,{useState,useEffect,useRef} from 'react';
import './BackToTop.css';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';


 const BackToTop = () => {
  const [position, setPosition] = React.useState({top: 0, left: 0});
  const [visibility, setVisibility] = React.useState(false);
  React.useEffect(() => {
    window.scroll({
      top: position.top,
      left: position.left,
      behavior: 'smooth'
    })
  })
   

  const scrollTop = React.useRef()
   React.useEffect(( ) => {
     window.addEventListener('scroll', (e) => {
      window.scrollY > 200 
      ? scrollTop.current.style.display = 'inline-block'
      : scrollTop.current.style.display = 'none'
    })
   }) 
 
  return(
    <>
      <span 
        onClick={() => setPosition({...position, position: {top: 0, left: 0}})}  className="circle"
        ref={scrollTop}
      ><ArrowUpwardTwoToneIcon fontSize = 'large'/></span>
    </>
  )    
}

export default BackToTop;



