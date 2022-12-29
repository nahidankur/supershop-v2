import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import RoundLoader from '../RoundLoader'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import {saveShippingAddress } from '../../actions/cartAction'
import CheckOutStep from '../CheckOutStep'

const ShippingScreen = ({history}) => {

     const cart = useSelector(state => state.cart)
     const { shippingAddress}  = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch= useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')


    }
    return (
        <>
        <CheckOutStep step1 step2 />
        <h1>Shipping</h1>
         <Form onSubmit={submitHandler}>
           <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter city'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='postalcode'>
                <Form.Label>Postalcode</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Postalcode'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Country'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>
                  Continue

              </Button>
    </Form>
    </>
        
    )
}

export default ShippingScreen
