import React,{ useContext } from "react"
import { store } from "../App";

const ProtectedRoute = () => {
    const [contextData, setContextData] = useContext(store);
    console.log(contextData);
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute