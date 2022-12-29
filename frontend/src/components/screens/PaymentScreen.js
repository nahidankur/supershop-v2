import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import RoundLoader from '../RoundLoader'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import {savePaymentMethod } from '../../actions/cartAction'
import CheckOutStep from '../CheckOutStep'

const PaymentScreen = ({history}) => {

     const cart = useSelector(state => state.cart)
     const { shippingAddress}  = cart
     if(!shippingAddress.address){
         history.push('/shipping')
     }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
  

    const dispatch= useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')


    }
    return (
        <>
        <CheckOutStep step1 step2 step3 />
        <h1>Select Payment Method</h1>
         <Form onSubmit={submitHandler}>
           <Form.Group >
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod'
                value='PayPal' checked onChange={e => setPaymentMethod(e.target.value)}
                >

                </Form.Check>
                </Col>
              </Form.Group>

              
              <Button type='submit' variant='primary'>
                  Continue

              </Button>
    </Form>
    </>
        
    )
}

export default PaymentScreen
