import { createUserWithEmailAndPassword } from 'firebase/auth';
import React,{useState} from 'react'
import { auth,db } from './Firebase';
import { setDoc,doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import ProfilePic from './ProfilePic';

const AdminSignUp = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [photo,setPhoto] = useState("");

    const handleRegister = async (e) => {
    e.preventDefault();
    try{
       await createUserWithEmailAndPassword(auth,email,password);
        const user = auth.currentUser;
        console.log(auth);
        console.log(user);
        toast.success("User Registered success",{

            position: "top-right"
        });
        if(user) {
            await setDoc(doc(db,"users",user.uid),{
                email:user.email,
                firstName:fname,
                lastName:lname,
            });
        }
    } catch (error) {

        console.log(error.message)
        console.log('user Registered');
        toast.success("User Registered failure",{

            position: "top-right"
        });

    }



    }

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>
      <div className='mb-3'>
      <label>First Name</label>
      <input
      type="text"
      placeholder='Enter your first Name'
      className='mb-3'
      name='fname'
      value={fname}
      onChange={(e) => setFname(e.target.value)}
      ></input>
      </div>
      <div className='mb-3'>
      <label>Last Name</label>
      <input
      type='text'
      placeholder='Enter your last name'
      className='mb-3'
      name='lname'
      value={lname}
      onChange={(e) => setLname(e.target.value)}
      ></input>
      </div>
      <div className='mb-3'>
      <label>Password</label>
      <input
      type='password'
      placeholder='Enter your password'
      className='mb-3'
      value={password}
      onChange={(e) => setPassword(e.target.value)}  
      ></input>
      </div>
      <div className='mb-3'>
      <label>Email Address</label>
      <input
       type='text'
       placeholder='Enter your Email'
       className='mb-3'
       value={email}  
       onChange={(e) => setEmail(e.target.value)}    
      ></input>
      </div>
      <div className='mb-3'>
      <label>Email Address</label>
      <input
       type='file'
       placeholder='Enter your photo'
       className='mb-3'
       value={photo}  
       onChange={(e) => setPhoto(e.target.value)}    
      ></input>
      </div>
      <div className='d-grid'>
      <button type='submit' className='btn btn-primary'>Sign up</button>
      </div>
      <ProfilePic/>
    </form>
   
  )
}

export default AdminSignUp
