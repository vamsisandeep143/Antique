import { Button } from '@mui/material';
import React from 'react'
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
  return (
    <Styleddiv><StyledBtn variant='contained'>Sign In</StyledBtn>
    <StyledBtn variant='contained'>Sign Up</StyledBtn>
    
    </Styleddiv>

  )
}

export default Login