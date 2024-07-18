import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import background from '../Assets/background.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import './Upload.css';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from './Firebase';
import { store } from '../App';
import { db } from './Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const UploadImage = () => {
    const [contextData, setContextData] = useContext(store);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [text, setText] = useState('Brass');
    const [data, setData] = useState([]);

    console.log(contextData);

    const handleImageChange = async (e) => {
        const image = e.target.files[0];

        if (image) {
            try {
                setUploading(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef);
                console.log('Image URL:', downloadURL); // Debugging line
                setImageUrl(downloadURL);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleChange = (e) => (setText(e.target.value))

    const handleClick = async () => {
        if (!text || !imageUrl) {
            console.warn('Text or Image URL is missing!');
            return;
        }

        const valRef = collection(db, 'textData');
        try {
            const docRef = await addDoc(valRef, { txtVal: text, imageUrl: imageUrl });
            const newData = { id: docRef.id, txtVal: text, imageUrl: imageUrl };
            setData(prevData => [...prevData, newData]);
        } catch (error) {
            console.error('Error saving data to Firestore:', error);
        }
    };

    const getData = async () => {
        const valRef = collection(db, 'textData');
        try {
            const dataDb = await getDocs(valRef);
            const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
            console.log('Fetched Data:', allData); // Debugging line
            setData(allData);
        } catch (error) {
            console.error('Error fetching data from Firestore:', error);
        }
    };

    const handleDelete = async (id, imageUrl) => {
        try {
            // Delete the document from Firestore
            await deleteDoc(doc(db, 'textData', id));
            
            // Delete the image from Firebase Storage
            const storage = getStorage(app);
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);

            // Update the local state
            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting image and data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{ backgroundImage: `url(${background})` }}>
            <h2 style={{ textAlign: "center" }}>Antique Collection</h2>


            choose the antique item here:      <FormControl className='Test'>
                <InputLabel id="demo-simple-select-label">Antique</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={text}
                    label="Antique"
                    onChange={handleChange}
                >
                    <MenuItem value={'Brass'}>Brass</MenuItem>
                    <MenuItem value={'Bronze'}>Bronze</MenuItem>
                    <MenuItem value={'Furniture'}>Furniture</MenuItem>
                    <MenuItem value={'Painting'}>Painting</MenuItem>
                </Select>
            </FormControl>
            <input type='file' onChange={handleImageChange} />
            <button onClick={handleClick} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <div className="upload-image-container">
                {imageUrl && <img src={imageUrl} alt='uploaded' style={{ maxWidth: 150 }} />}
                {data.map((value) => (
                    <div className='tester' key={value.id}>
                        <div className='image-container'>
                            <img className='test-item' src={value.imageUrl} height='200px' width='200px' alt='uploaded' />
                        </div>
                        <h1>{value.txtVal}</h1>
                        <Button onClick={() => handleDelete(value.id, value.imageUrl)} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadImage;
