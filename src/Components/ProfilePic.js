import React from 'react'
import ProfilePicImage from '../Assets/ProfilePic.jpg';
import Avatar from '../Assets/avatar.png'
import Styled from 'styled-components';

const ProfilePic = () => {

    const StyledImg = Styled.img`
    
    width:30px;
    height:30px;
    `;
    const handleProfilePic = () => {
     


    }

    const handleUpload = () => {


    }

  return (
    <div><input type = 'file' onChange={handleProfilePic}/>
    <button onChange={handleUpload}>Upload Image</button>
    <StyledImg src={Avatar} alt='avatar'></StyledImg>
    
    
    
    </div>
    
  )
}

export default ProfilePic