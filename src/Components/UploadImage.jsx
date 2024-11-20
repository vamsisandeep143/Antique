import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import background from "../Assets/background.jpg";
import Modal from '@mui/material/Modal';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField'; // Import TextField for DateTimePicker

import "./Upload.css";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  
} from "firebase/storage";
import app from "./Firebase";
import { store } from "../App";
import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const UploadImage = () => {
  const [contextData, setContextData] = useContext(store);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("Brass");
  const [productName,setProductName] = useState('');
  const [booleanText,setBooleanText] = useState('true');
  const [data, setData] = useState([]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [createdDate, setCreatedDate] = useState(null); // State for date
  const [isEditing, setIsEditing] = useState(null); // Track which item is being edited
  const [editData, setEditData] = useState({}); 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // const handleImageChange = async (e) => {
  //   const files = Array.from(e.target.files);

  //   const 
  //   if (image) {
  //     try {
  //       setUploading(true);
  //       const storage = getStorage(app);
  //       const storageRef = ref(storage, `images/${productName || "default"}/${image.name}`);
  //       await uploadBytes(storageRef, image);
  //       const downloadURL = await getDownloadURL(storageRef);
  //       setImageUrl(downloadURL);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   }
  // };

  const StyledDiv = styled.div`
  
  width : 500px;
  height: 500px;
  background-color: #FFFAFA;
  border-radius:10px;
  z-index:999;
  
  
  
  `;


  const [imageUrls, setImageUrls] = useState([]);
  
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
  
    const uploadPromises = files.map(async (image) => {
      if (image) {
        try {
          setUploading(true);
          const storage = getStorage(app);
          const storageRef = ref(storage, `images/${productName || "default"}/${image.name}`);
          await uploadBytes(storageRef, image);
          const downloadURL = await getDownloadURL(storageRef);
          
          // Update imageUrls state with each new URL
          setImageUrls((prevUrls) => [...prevUrls, downloadURL]);
  
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setUploading(false);
        }
      }
    });
  
    await Promise.all(uploadPromises);
    getData(); // Refresh the data after uploading
  };
  
  const handleClick = async () => {
    if (!text || imageUrls.length === 0) {
      console.warn("Text or images are missing!");
      return;
    }
  
    const txtVal = {
      item: text,
      isDelivery: booleanText,
      originalPrice: originalPrice,
      discountPrice: discountPrice,
      description: description,
      weight: weight,
      height: height,
      createdDate: createdDate ? createdDate.toISOString() : null,
    };
  
    const valRef = collection(db, "textData");
    try {
      const docRef = await addDoc(valRef, {
        txtVal: txtVal,
        imageUrls: imageUrls, // Store the array of image URLs
      });
      
      const newData = {
        id: docRef.id,
        txtVal: txtVal,
        imageUrls: imageUrls,
      };
      setData((prevData) => [...prevData, newData]);
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  };

  const handleChange = (e) => setText(e.target.value);

  const handleBooleanChange = (e) => setBooleanText(e.target.value);

  const handleDateChange = (newValue) => {
    setCreatedDate(newValue);
  };

 


  const getData = async () => {
    const valRef = collection(db, "textData");
    try {
      const dataDb = await getDocs(valRef);
      const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
      setData(allData);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "textData", id));

      // Delete the image from Firebase Storage
      const storage = getStorage(app);
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);

      // Update the local state
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting image and data:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const docRef = doc(db, "textData", id);

      await updateDoc(docRef, {
        txtVal: editData.txtVal,
      // imageUrls: editData.imageUrls,
      });

      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, ...editData } : item))
      );

      setIsEditing(null);
      setEditData({});
      setOpen(false)
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      txtVal: { ...prevData.txtVal, [field]: value },
    }));
  };


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setContextData({
      ...contextData,
      imageData: data,
    });
  }, [data]);

  return (
    <section className="upload-container">
      <div className="container">
        <h2 className="cc-page-title">Antique Collection</h2>

        <div className="input-group-container">
          <section className="row">
            <div className="col-6">
              <div className="row mb-4">
                <div className="col-6">
                  <label className="custom-form-lable">choose the antique item here:</label>
                </div>
                <div className="col-6">
                  <InputLabel id="demo-simple-select-label">Antique</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={text}
                    sx={{ minWidth: 200 }}
                    label="Antique"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Brass"}>Brass</MenuItem>
                    <MenuItem value={"Bronze"}>Bronze</MenuItem>
                    <MenuItem value={"Furniture"}>Furniture</MenuItem>
                    <MenuItem value={"Painting"}>Painting</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                  <label className="custom-form-lable">Is Delivery option available:</label>
                </div>
                <div className="col-6">
                  <InputLabel id="demo-simple-select-label">Is Delivery option available</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={booleanText}
                    sx={{ minWidth: 200 }}
                    label="Antique"
                    onChange={handleBooleanChange}
                  >
                    <MenuItem value={"true"}>True</MenuItem>
                    <MenuItem value={"false"}>False</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">Price</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    name="price"
                    className="custom-input"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">Product Name</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="product"
                    className="custom-input"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">discountPrice</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    name="price"
                    value={discountPrice}
                    className="custom-input"
                    onChange={(e) => setDiscountPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">description</label>
                </div>
                <div className="col-6">
                  <input
                    type="textarea"
                    name="description"
                    value={description}
                    className="custom-input"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">Weight in lbs</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="Weight"
                    value={weight}
                    className="custom-input"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">Height in Inches</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="height"
                    value={height}
                    className="custom-input"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">Created Date</label>
                </div>
                <div className="col-6">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Created Date"
                      value={createdDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <label className="custom-form-lable">Choose image</label>
                </div>
                <div className="col-6">
                  <input type="file" multiple onChange={handleImageChange} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12 pt-4">
                  <button onClick={handleClick} disabled={uploading} className="upload-btn">
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="upload-image-container">
          {imageUrls && (
            <img src={imageUrls} alt="uploaded" style={{ maxWidth: 150 }} />
          )}
          {data.map((value) => {
            return (
              <section className="upload-preview-item" key={value.id}>
                <div className="upload-image-container">
                  <img
                    className="upload-image"
                    src={value.imageUrls}
                    alt="uploaded"
                  />
                </div>
                <h1 className="item-desp">
                  <span className="info">Item</span>
                  <span className="value">{value.txtVal?.item}</span>
                </h1>
                <h1 className="item-desp">
                  <span className="info">Price</span>
                  <span className="value">{value.txtVal?.originalPrice}</span>
                </h1>
                <h1 className="item-desp">
                  <span className="info">Weight</span>
                  <span className="value">{value.txtVal?.weight}</span>
                </h1>
                <h1 className="item-desp">
                  <span className="info">Height</span>
                  <span className="value">{value.txtVal?.height}</span>
                </h1>
                <h1 className="item-desp">
                  <span className="info">Is Delivery available on this:</span>
                  <span className="value">{value.txtVal?.isDelivery}</span>
                </h1>
                <h1 className="item-desp">
                  <span className="info">Discount</span>
                  <span className="value">{value.txtVal?.discountPrice}</span>
                </h1>
                <h1 className="item-desp">
                  <span className="info">Description</span>
                  <span className="value">{value.txtVal?.description}</span>
                </h1>
                <h1 className="item-desp">
                  <span className="info">Created Date</span>
                  <span className="value">{value.txtVal?.createdDate}</span>
                </h1>
                {data.map((value) => {
              const isItemBeingEdited = isEditing === value.id;
              return <>
              {/* {isItemBeingEdited && ( */}
                {(
              //   <Modal
              //   open={open}
              //   onClose={handleClose}
              //   aria-labelledby="modal-modal-title"
              //   aria-describedby="modal-modal-description"
              // >
              //   <Box sx={style}>
              //     <Typography id="modal-modal-title" variant="h6" component="h2">
              //       Text in a modal
              //     </Typography>
              //     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              //     </Typography>
              //   </Box>
             
               
              
              //         <InputLabel id="demo-simple-select-label">Antique</InputLabel>
              //     <Select
              //       labelId="demo-simple-select-label"
              //       id="demo-simple-select"
              //       value={editData.txtVal?.item || ""}
              //       sx={{ minWidth: 200 }}
              //       label="Antique"
              //       onChange={(e) => handleEditChange("item", e.target.value)}
              //     >
              //       <MenuItem value={"Brass"}>Brass</MenuItem>
              //       <MenuItem value={"Bronze"}>Bronze</MenuItem>
              //       <MenuItem value={"Furniture"}>Furniture</MenuItem>
              //       <MenuItem value={"Painting"}>Painting</MenuItem>
              //     </Select>
              //     <div>
              //     <InputLabel id="demo-simple-select-label">Price</InputLabel>
              //       <input
              //         type="number"
              //         value={editData.txtVal?.originalPrice || ""}
              //         onChange={(e) => handleEditChange("originalPrice", e.target.value)}
              //       />
              //       </div>
              //       <Button onClick={() => handleUpdate(value.id)} variant="contained">
              //         Save
              //       </Button>
              //     </Modal>
              // <h1>Hello</h1>
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update your Antique details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 ,color:'#ffffff'}}>
            Edit the below fields
          </Typography>

               <InputLabel id="demo-simple-select-label">Antique</InputLabel>
                  <Select
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={editData.txtVal?.item || ""}
                   sx={{ minWidth: 200 }}
                    label="Antique"
                     onChange={(e) => handleEditChange("item", e.target.value)}
                  >
            <MenuItem value={"Brass"}>Brass</MenuItem>
                <MenuItem value={"Bronze"}>Bronze</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
                <MenuItem value={"Painting"}>Painting</MenuItem>
              </Select>
              <div className="mt-4">
                <InputLabel id="demo-simple-select-label">Price</InputLabel>
                <div className="mb-4">
                <input
                   type="number"
                   value={editData.txtVal?.originalPrice || ""}
                   onChange={(e) => handleEditChange("originalPrice", e.target.value)}
                 />
                 </div>
                 </div>
                 <div className="row mb-4">
                <div className="mb-4">
                <InputLabel id="demo-simple-select-label">Discount Price</InputLabel>
                </div>
                <div>
                  <input
                    type="number"
                    name="price"
                    value={editData.txtVal?.discountPrice || ""}
                    className="custom-input"
                    onChange={(e) => handleEditChange("discountPrice", e.target.value)}
                  />
                  </div>
                
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <InputLabel >description</InputLabel>
                </div>
                <div>
                  <input
                    type="textarea"
                    name="description"
                    value={editData.txtVal?.description || ""}
                    className="custom-input"
                    onChange={(e) => handleEditChange("description", e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                <InputLabel >Weight in lbs</InputLabel>
                </div>
                <div >
                  <input
                    type="text"
                    name="Weight"
                    value={editData.txtVal?.weight}
                    className="custom-input"
                    onChange={(e) => handleEditChange("weight", e.target.value)}
                  />
                </div>
              </div>
              <div className="row ">
                <div >
                <InputLabel>Height in Inches</InputLabel>
                </div>
                </div>
                <div >
                  <input
                    type="text"
                    name="height"
                    value={editData.txtVal?.height}
                    className="custom-input"
                    onChange={(e) => handleEditChange("height", e.target.value)}
                  />
                </div>
                 <Button onClick={() => handleUpdate(value.id)} variant="contained" className="m-4">
                   Save
                 </Button>
        </Box>
        
      </Modal>
          )}
              </>
           } )}
                
                <Button
                      onClick={() => {
                        // setIsEditing(value.id);
                        // setEditData(value);
                        setOpen(true)
                      }}
                      sx={{marginLeft:'10px'}}
                      variant="contained"
                       className="trash-btn"
                       startIcon={<UpdateIcon />}
                    >
                      Edit
                    </Button>
                <Button
                  onClick={() => handleDelete(value.id, value.imageUrls)}
                  variant="contained"
                  className="trash-btn"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default UploadImage;
