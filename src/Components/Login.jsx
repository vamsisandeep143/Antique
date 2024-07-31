import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components';

const Styleddiv = Styled.div`
border:2px solid black;
padding:10px;
position:absolute;
right:30px;
display:flex;
flex-direction:column;
align-items:center;
Justify-content:center;
`;

const StyledBtn = Styled(Button)`
width : 100px;
height : 20px;
margin:10px !important;
border-radius:10px;

`;
const Login = () => {
  const [userSignIn,SetUserSignIn] = useState();
  const test = localStorage.getItem('loggedIn');
  useEffect(()=>{
    if(test){
      SetUserSignIn(false)
    }
  },[test])
  console.log(test,'test');

  return (
    <>
      {
        !userSignIn ? (
          <Styleddiv><StyledBtn variant='contained'>Sign In</StyledBtn>
          <StyledBtn variant='contained'>Sign Up</StyledBtn>
      </Styleddiv>
        ):
        (
          <StyledBtn variant='contained'>LogOut</StyledBtn>
        )
      }
    </>
    
    
    
  )
}

export default Login