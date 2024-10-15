import React from 'react';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Paper } from '@mui/material';
import Styled from "styled-components";
import './Deliverycard.css';

const ContainerPaper = Styled(Paper)`

display:flex;
flex-direction:row;
align-items:center;
padding:10px;
margin:20px;
background-color:#F3F6FB !important;
`;

const ContainerDiv = Styled.div`
display:flex;
flex-direction:column;
padding:10px;


`


const Deliverycard = () => {
  return (
    <div className='container'>
<ContainerPaper>
<CampaignTwoToneIcon sx={{ fontSize: 40 , color:'#055d6b' }}/>
<ContainerDiv>
<h2>100% GENUINE PRODUCTS</h2>
<h4>We deliver authenticated antiques</h4></ContainerDiv>
<div className="col Verticalline"></div>

<PaymentsIcon sx={{ fontSize: 40, color:'#055d6b' }}/>
<ContainerDiv>
<h2>SECURED PAYMENTS</h2>
<h4>Our Payment Gateway having Industry Grade Security</h4></ContainerDiv>
<div className="col Verticalline"></div>

<LocalShippingIcon sx={{ fontSize: 40, color:'#055d6b' }}/>
<ContainerDiv>
<h2>FAST AND RELIABLE SHIPPING</h2>
<h4>With in the range we can able to deliver product with out any loss.</h4>
</ContainerDiv>
</ContainerPaper>




    </div>
  )
}

export default Deliverycard