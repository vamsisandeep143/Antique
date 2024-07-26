import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useAuth, upload } from './Firebase';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { store } from '../App';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// Styled components
const StyledUser = styled.p`
font-size:2rem;
font-weight:500;
font-family: cursive;
color:#3e32a8;
padding:10px;


`;
const StyledImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
`;

const IconOverlay = styled.div`
  position: absolute;
  top: 1px;
  left: 50px;
  background-color: rgb(42 51 139 / 50%);
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  z-index: 10;
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  padding: 0;
  margin: -1px;
`;

const ProfilePic = () => {
  const currentUser = useAuth();
  const [contextData, setContextData] = useContext(store);
  const userdetails = contextData;

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671126.jpg');

  const handleProfilePic = async (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setPhoto(selectedFile);
      try {
        await handleUpload(selectedFile);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleUpload = async (file) => {
    if (file && currentUser) {
      try {
        await upload(file, currentUser, setLoading);
        const fileExtension = file.name.split('.').pop();
        const photoRef = ref(getStorage(), `ProfilePic/${currentUser.uid}.${fileExtension}`);
        const newPhotoUrl = await getDownloadURL(photoRef);
        setPhotoUrl(newPhotoUrl);

        // Update user's profile with the new photo URL
        await currentUser.updateProfile({ photoURL: newPhotoUrl });
      } catch (error) {
        console.error('Error retrieving file URL:', error);
      }
    }
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Hidden file input */}
      <HiddenInput id="fileInput" type="file" onChange={handleProfilePic} />
      
      {/* Profile picture */}
      <StyledImg 
        src={photoUrl} 
        alt='avatar' 
        onClick={() => document.getElementById('fileInput').click()} 
      />
      
      {/* Icon overlay */}
      <IconOverlay onClick={() => document.getElementById('fileInput').click()}>
        <AddAPhotoIcon />
      </IconOverlay>
      
      <StyledUser>{userdetails?.user_details?.firstName}</StyledUser>
    </div>
  );
};

export default ProfilePic;
