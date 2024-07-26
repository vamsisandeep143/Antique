import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, { createContext, useState } from 'react';
import Blogs from './Components/Blogs';
import BrandCRUD from './Components/BrandCRUD';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Layout from './Layout';
import CRUDLocalStorage from './Components/CRUDLocalStorage';
import ScrollBarHorizontal from './Components/ScrollBarHorizontal';
import Timer from './Components/Timer';
import Dragable from './Components/Dragable';
import ImageGallery from './Components/ImageGallery';
import OurProducts from './Components/OurProducts';
import { ToastContainer } from 'react-toastify'
import AdminLogin from './Components/AdminLogin';
import AdminSignUp from './Components/AdminSignUp';
import AdminDashboard from './Components/AdminDashboard';
import UploadImage from './Components/UploadImage';
import ProtectedRoute from './Components/ProtectedRoute';
import Logout from './Components/Logout';
import ContactUs from './Components/ContactUs';
import Login from './Components/Login';
import ProfilePic from './Components/ProfilePic';
import ProductDetails from './Components/ProductDetails';
import Shop from './Components/Shop';
import AddToCart from './Components/AddToCart';
import Footer from './Components/Footer';
// import photo from '../Assets/background.jpg';

export const store = createContext({});


function App() {

  const [contextData, setContextData] = useState({
    login: false,
  });
  const [cart, setCart] = useState([]);
  const addToCart = (item) => {
    console.log(item,"item")
    setCart((prevCart) => [...prevCart, {item}]);
  };
  return (
    <store.Provider value={[contextData, setContextData,addToCart,cart]}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/our-products" element={<OurProducts />} />
            <Route path="/signup" element={<AdminSignUp />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="loginComp" element={<Login/>}/>
           
            <Route element={<ProtectedRoute/>}>
            <Route path="/Dashboard" element={<AdminDashboard />} />
            <Route path="/profilepic" element={<ProfilePic/>} />
            <Route path="/image-gallery" element={<ImageGallery />} />
            <Route path="/load" element={<UploadImage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/add-to-cart" element={<AddToCart />} />
            <Route path="/product/:productID" element={<ProductDetails setContextData={setContextData} contextData={contextData} />} />
            </Route>


           
            <Route path="/logout" element={<Logout />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/protect" element={<ProtectedRoute />} />
           
          </Route>
        </Routes>
        <ToastContainer />
        <Footer/>
      </BrowserRouter>
    </store.Provider>
  );
}

export default App;