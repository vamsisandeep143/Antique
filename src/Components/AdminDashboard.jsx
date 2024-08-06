import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { store } from "../App";
import "./AdminDashboard.css";
import ProfilePic from "./ProfilePic";
import Example from "./Example";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";

const AdminDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [contextData, setContextData] = useContext(store);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setContextData({
              ...contextData,
              user_details: docSnap.data(),
            });

            const userInfo = JSON.stringify(docSnap.data());
            localStorage.setItem("user_details", userInfo);

            navigate("/dashboard");
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
    try {
      await auth.signOut();
      setContextData({
        ...contextData,
        login: false,
      });
      localStorage.removeItem("loggedIn");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const navigateToGallery = () => {
    navigate("/load");
  };

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];

  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="container">
      <div className="dashboard-container container-fluid">
        <div className="row">
          <div className="col d-flex justify-content-start">
            <h3 className="dashboard-heading">
              Welcome {userDetails?.firstName} ...
            </h3>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2 custom-btn-primary" onClick={handleLogOut}>
                Log Out
              </button>
              <button className="btn btn-secondary custom-btn-primary" onClick={navigateToGallery}>
                Go to Gallery
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div
                className="card-body"
                style={{ width: "100%", height: "400px" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={730} height={250}>
                    <Pie
                      data={data01}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#8884d8"
                    />
                    <Pie
                      data={data02}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#82ca9d"
                      label
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div
                className="card-body"
                style={{ width: "100%", height: "400px",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center" }}
              >
                {userDetails ? <ProfilePic /> : <p>Loading</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pic"></div>
    </div>
  );
};

export default AdminDashboard;
