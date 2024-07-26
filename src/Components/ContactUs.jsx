import React, { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import './ContactUs.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const StyledAnchor = Styled.a`
  font-size: 20px;
`;

const ContactUs = () => {
  const form = useRef();
  const [user, setUser] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const getDataFromUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, feedback } = user;

    // Post data to your database
    const res = await fetch('https://login-app-69da8-default-rtdb.firebaseio.com/usersData.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, feedback }),
    });

    if (res.ok) {
      toast.success('Data Entered Successfully', {
        position: 'top-right',
      });

      // Send the email using EmailJS
      emailjs.sendForm("service_m4jt4cj", "template_176liaj", form.current, "AXSAuE2rBlB7_dtDW")
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
          toast.error(`Failed to send email: ${error.text}`, {
            position: 'top-right',
          });
        });
    } else {
      toast.error('Failed to enter data', {
        position: 'top-right',
      });
    }

    setUser({
      name: '',
      email: '',
      feedback: '',
    });
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12">
          <h1 className="text-center">Contact Card</h1>
        </div>
        <h3 className="col-6 mt-4">SEND US A MESSAGE</h3>
        <div className="row">
          <div className="col-6">
            <form ref={form} onSubmit={postData}>
              <TextField
                className="w-100 mt-4"
                id="outlined-basic"
                name="name"
                label="Name"
                variant="standard"
                placeholder="Enter Name"
                onChange={getDataFromUser}
                value={user.name}
              />
              <TextField
                className="w-100 mt-4"
                id="outlined-basic"
                label="Email Address"
                name="email"
                variant="standard"
                placeholder="Enter Email"
                onChange={getDataFromUser}
                value={user.email}
              />
              <TextField
                id="outlined-multiline-static"
                variant="standard"
                name="feedback"
                label="Feedback"
                multiline
                rows={4}
                className="w-100 mt-4"
                value={user.feedback}
                onChange={getDataFromUser}
                placeholder="Type Message here ....."
              />
              <Button type="submit" className="mt-4" variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </form>
            <ToastContainer />
          </div>
          <div className="col Verticalline"></div>
          <div className="col-5">
            <h3 className="m-4">Social Connect</h3>
            <StyledAnchor className="m-4" href="https://wa.me/9491118102?text=Hello%2C%20Srinivas!" target="_blank">
              <i className="fa fa-whatsapp" aria-hidden="true"></i>
            </StyledAnchor>
            <StyledAnchor className="m-4" href="https://www.instagram.com/vangara_srinivas/" target="_blank">
              <i className="fa-brands fa-facebook-f"></i>
            </StyledAnchor>
            <StyledAnchor className="m-4" href="https://www.linkedin.com/in/vangara-srinivas-b2a983127/" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </StyledAnchor>
            <StyledAnchor className="m-4" href="https://github.com/vangarasrinivas?tab=repositories" target="_blank">
              <i className="fa-brands fa-twitter"></i>
            </StyledAnchor>
            <h3 className="m-4">Through Call</h3>
            <h4 className="m-4">416 887 2485</h4>
            <h3 className="m-4">Business Address</h3>
            <h4 className="m-4">3278 Tremaine Road, Burlington, ON L7M 0X9</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
