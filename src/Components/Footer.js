import React from 'react';
import { Button, TextField } from '@mui/material';
import Styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import './ContactUs.css';


const StyledAnchor = Styled.a`
font-size:20px;
color:#fff
`
const StyledFooterLink = Styled.p`
font-size:14px;
color:#fff
`

const Footer = () => {
    return (
        <>
        <div style={{backgroundColor:'#382925',color:'#fff',width:'100%',display:'flex',justifyContent:'space-around',padding:'10px 0'}}>

                <div>
                <h2 className='m-4'>Company</h2>
                    <StyledFooterLink className='m-4'>Our Journey</StyledFooterLink>
                    <StyledFooterLink className='m-4'>Our Products</StyledFooterLink>
                    <StyledFooterLink className='m-4'>Contact US</StyledFooterLink>
                    <StyledFooterLink className='m-4'>Terms and Conditions</StyledFooterLink>
                </div>
                <div className=''>
                    <h2 className='m-4'>Contact US</h2>
                    <StyledFooterLink className='m-4'>Through Call - 416 887 2485</StyledFooterLink>
                    <StyledFooterLink className='m-4'>Business Address</StyledFooterLink>
                    <StyledFooterLink className='m-4'>3278 tremaine road,  </StyledFooterLink>
                    <StyledFooterLink className='m-4'>Burlington,</StyledFooterLink>
                    <StyledFooterLink className='m-4'>ON L7M OX9</StyledFooterLink>
                </div>
                <div>
                <h2 className='m-4'>Social Connect</h2>
                    <StyledAnchor className='m-4' href="https://wa.me/9491118102?text=Hello%2C%20Srinivas!" target='_blank'><i class="fa fa-whatsapp" aria-hidden="true"></i></StyledAnchor>
                    <StyledAnchor clStyledAnchorssNStyledAnchorme='m-4' href='https://www.instStyledAnchorgram.com/vangara_srinivas/' target='_blank'><i class="fa-brands fa-facebook-f"></i></StyledAnchor>
                    <StyledAnchor className='m-4' href='https://www.linkedin.com/in/vangara-srinivas-b2a983127/' target='_blank'><i class="fa-brands fa-instagram"></i></StyledAnchor>
                    <StyledAnchor className='m-4' href='https://github.com/vangarasrinivas?tab=repositories' target='_blank'><i class="fa-brands fa-twitter"></i></StyledAnchor>
                </div>
                </div>

        </>
    )
}

export default Footer