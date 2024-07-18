import React, { useState, useContext } from 'react';
import './AdminLogin.css'
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { auth, db } from './Firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { store } from '../App';


const AdminLogin = () => {
    const [contextData, setContextData] = useContext(store);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await signInWithEmailAndPassword(auth, email, password);

            toast.success("User login success", {

                position: "top-right"
            });
            Navigate('/Dashboard');

            setContextData({ ...contextData, login: true })
        }

        catch (error) {
            console.log(error);

            toast.success("User login failure", {

                position: "top-right"
            });


        }



    }

    return (
        <form className='Container' onSubmit={handleSubmit}>
            <h3 className='LabelHeading'>Sign In</h3>
            <div className='mb-3' >
                <TextField id="outlined-basic" label="Email Address" variant="standard" placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {/* <label>Email Address</label>
                <input
                    type='text'
                    className='mb-3'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </input> */}
            </div>
            <div mb-3>
                {/* <label>Password</label>
                <input
                    type='password'
                    className='mb-3'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </input> */}
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    variant="standard"
                />

            </div>
            <div className='d-grid'>
                <button type='submit' className='btn btn-primary buttonTest'>Login</button>
            </div>
        </form>
    )
}

export default AdminLogin