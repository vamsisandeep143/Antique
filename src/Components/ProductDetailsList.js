import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from './Loader'

const ProductDetailsList = () => {
    const {productID}= useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        navigate(`/product/${productID}`)
    },[])
  return (
    <div>
      {/* <Loader /> */}
    </div>
  )
}

export default ProductDetailsList
