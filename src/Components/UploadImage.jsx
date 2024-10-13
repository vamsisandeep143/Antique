import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import background from "../Assets/background.jpg";
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
} from "firebase/firestore";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const UploadImage = () => {
  const [contextData, setContextData] = useContext(store);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("Brass");
  const [data, setData] = useState([]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [createdDate, setCreatedDate] = useState(null); // State for date

  const handleImageChange = async (e) => {
    const image = e.target.files[0];

    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleChange = (e) => setText(e.target.value);

  const handleDateChange = (newValue) => {
    setCreatedDate(newValue);
  };

  const handleClick = async () => {
    if (!text || !imageUrl) {
      console.warn("Text or Image URL is missing!");
      return;
    }

    const valRef = collection(db, "textData");
    try {
      const docRef = await addDoc(valRef, {
        txtVal: {
          item: text,
          originalPrice: originalPrice,
          discountPrice: discountPrice,
          description: description,
          weight: weight,
          height: height,
          createdDate: createdDate ? createdDate.toISOString() : null,
        },
        imageUrl: imageUrl,
      });
      const newData = {
        id: docRef.id,
        txtVal: {
          item: text,
          originalPrice: originalPrice,
          discountPrice: discountPrice,
          description: description,
          weight: weight,
          height: height,
          createdDate: createdDate ? createdDate.toISOString() : null,
        },
        imageUrl: imageUrl,
      };
      setData((prevData) => [...prevData, newData]);
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
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
                  <input type="file" onChange={handleImageChange} />
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
          {imageUrl && (
            <img src={imageUrl} alt="uploaded" style={{ maxWidth: 150 }} />
          )}
          {data.map((value) => {
            return (
              <section className="upload-preview-item" key={value.id}>
                <div className="upload-image-container">
                  <img
                    className="upload-image"
                    src={value.imageUrl}
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
                <Button
                  onClick={() => handleDelete(value.id, value.imageUrl)}
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
};

export default UploadImage;
