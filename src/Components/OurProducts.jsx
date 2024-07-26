import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app, { db } from './Firebase';
import { Box, Grid, MenuItem, Paper, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const OurProducts = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data,setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [filteredValue,setFilteredValue] = useState('All')
    const navigate = useNavigate()
    const fetchImages = async () => {
        const storage = getStorage(app);
        const listRef = ref(storage, 'images/');

        try {
            const res = await listAll(listRef);
            const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
            setImages(urls);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };
    const getData = async () => {
        const valRef = collection(db, 'textData');
        try {
            const dataDb = await getDocs(valRef);
            const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
            console.log('Fetched Data our products:', allData); // Debugging line
            setData(allData)
            setFilteredData(allData);
        } catch (error) {
            console.error('Error fetching data from Firestore:', error);
        }
    };
    useEffect(()=>{
        console.log(filteredValue,"filteredValue")
        if(filteredValue !="All"){
            const mapData = data.filter((item)=>item.txtVal == filteredValue)
            setFilteredData(mapData)
        }else{
            setFilteredData(data)
        }
    },[filteredValue])
    useEffect(() => {
        fetchImages();
        getData()
    }, []);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return (
        <div style={{backgroundColor:'#f6f3f2'}}>
            <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>

            <Select  style={{width:'300px'}} value={filteredValue} onChange={(e)=>setFilteredValue(e.target.value)}>
                <MenuItem value={"All"} defaultValue>All</MenuItem>
                <MenuItem value={"Brass"}>Brass</MenuItem>
                <MenuItem value={"Bronze"}>Bronze</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
            </Select>
            </div>
            <h2>All Images</h2>
            {loading ? <p>Loading...</p> : (

                <div style={{width:'98%',margin:'auto'}}>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                       filteredData.map((item, index)=>{
                        return(
                        <Grid item xs={4} style={{cursor:'pointer'}} onClick={() => navigate(`/product/${item.id}`)}>
                            <Item>
                                <img src={item.imageUrl} alt={index} style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "contain",
                                }}/>
                            <h5>{item.txtVal}</h5>
                            </Item>
                        </Grid>
                        )
                       })
                    }
                
                </Grid>
                </Box>

                </div>
                // <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                //     {images.map((url, index) => (
                //         <div key={index} style={{ margin: '10px' }}>
                //             <img src={url} alt={`img-${index}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                //         </div>
                //     ))}
                // </div>
            )}
        </div>
    );
};

export default OurProducts;