import React, { useContext, useState } from 'react'
import { store } from '../App';


const Logout = () => {
  const [contextData, setContextData] = useContext(store);
  console.log(contextData);
  const userDara = JSON.parse(localStorage?.getItem('user_details')) || {}
  console.log({ userDara })
  const clerData = () => {
    localStorage.setItem('user_details', JSON.stringify({}))

  }
  return (
    <div>

      {Object.keys(userDara)?.length > 0 ? <button onClick={() => clerData()}>LogOut</button> : <h1>Logged out successfully</h1>}
    </div>
  )
}

export default Logout