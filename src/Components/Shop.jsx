// FormComponent.jsx
import React, { useContext, useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import Paypal from './Paypal';
import { store } from '../App';

const Shop = () => {
  
    const [, , , ,,total,] = useContext(store);
    const [formData, setFormData] = useState({
      email: '',
      product: '',
      contactNumber: '',
      name: '',
      address: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log(formData);
    };
  
    return (
      <section className='shop-page'>
        <Paypal total={total} />
      </section>

      

      // <Container>
      //   <Typography variant="h4" component="h1" gutterBottom>
      //     Submit Your Details
      //   </Typography>
      //   <form onSubmit={handleSubmit}>
      //     <Grid container spacing={2}>
      //       <Grid item xs={12}>
      //         <TextField
      //           fullWidth
      //           label="Email"
      //           name="email"
      //           value={formData.email}
      //           onChange={handleChange}
      //           required
      //         />
      //       </Grid>
      //       <Grid item xs={12}>
      //         <TextField
      //           fullWidth
      //           label="Product"
      //           name="product"
      //           value={formData.product}
      //           onChange={handleChange}
      //           required
      //         />
      //       </Grid>
      //       <Grid item xs={12}>
      //         <TextField
      //           fullWidth
      //           label="Contact Number"
      //           name="contactNumber"
      //           value={formData.contactNumber}
      //           onChange={handleChange}
      //           required
      //         />
      //       </Grid>
      //       <Grid item xs={12}>
      //         <TextField
      //           fullWidth
      //           label="Name"
      //           name="name"
      //           value={formData.name}
      //           onChange={handleChange}
      //           required
      //         />
      //       </Grid>
      //       <Grid item xs={12}>
      //         <TextField
      //           fullWidth
      //           label="Address"
      //           name="address"
      //           value={formData.address}
      //           onChange={handleChange}
      //           required
      //         />
      //       </Grid>
      //       <Grid item xs={12}>
      //         <Button variant="contained" color="primary" type="submit">
      //           Submit
      //         </Button>
      //       </Grid>
      //     </Grid>
      //   </form>
      // </Container>
    );
  };

export default Shop;
