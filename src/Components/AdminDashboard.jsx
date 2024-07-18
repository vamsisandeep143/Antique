import React, { useEffect, useState, useContext } from 'react';
import { auth, db } from './Firebase';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { store } from '../App';




const AdminDashboard = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [contextData, setContextData] = useContext(store);
    const Navigate = useNavigate();
    const fetchUserDetails = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                console.log('Document Reference:', docRef);
                try {
                    const docSnap = await getDoc(docRef);
                    console.log('Document Snapshot:', docSnap);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                        setContextData({
                            ...contextData,
                            user_details: docSnap.data()
                        });
                        
                        const userInfo=JSON.stringify(docSnap.data())

                    localStorage.setItem('user_details', userInfo)

                    } else {
                        console.log("User document does not exist");
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                }
            } else {
                console.log("User is not logged in");
            }
        });
    };

    const handleLogOut = async () => {
        console.log('logout')

        try {
            await auth.signOut();
            setContextData({
                ...contextData,
                login:false
            });
            Navigate('/login');
        }
        catch (error) {
            console.log(error);


        }



    }

    useEffect(() => { fetchUserDetails(); }, []);

    console.log(contextData);

    const imageUrl = () => {

    Navigate("/load");


    }

   

    return (

        <div>
            {userDetails ? (
                <>
                    <h3> Welcome {userDetails.firstName}</h3>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>FirstName: {userDetails.firstName}</p>
                        <p>LastName: {userDetails.lastName}</p>



                    </div>

                    <button className='btn btn-primary' onClick={handleLogOut} >Log Out</button>
                    <button className='btn btn-secondary' onClick={imageUrl} >Gallary</button>
                    
                    



                </>



            ) : (

                <p>Loading</p>

            )}

        </div>
    )
}

export default AdminDashboard
