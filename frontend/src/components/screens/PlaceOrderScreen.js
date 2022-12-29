import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import { Row, Col, Form, Button, ListGroup, Image, Card } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import RoundLoader from '../RoundLoader'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import CheckOutStep from '../CheckOutStep'
import Message from '../Message'
import { createOrder} from '../../actions/orderAction'
import {  USER_DETAILS_RESET,ORDER_CREATE_RESET } from '../../constants/constants'

const PlaceOrderScreen = ({history}) => {
    const dispatch  = useDispatch()
    const cart = useSelector(state => state.cart)

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error } = orderCreate

    useEffect(()=>{
        if(success){
          history.push(`/order/${order._id}`)
          dispatch({type: USER_DETAILS_RESET})
          dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, history])
    
    const placeorderHandler = ()=>{
       dispatch(createOrder({
           orderItems: cart.cartItems,
           shippingAddress: cart.shippingAddress,
           paymentMethod: cart.paymentMethod,
           itemsPrice: cart.itemsPrice,
           shippingPrice: cart.shippingPrice,
           taxPrice: cart.taxPrice,
           totalPrice: cart.totalPrice
       }))
    }

    // calculate Ordered items Price
    cart.itemsPrice = cart.cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0)
     cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 30

     cart.taxPrice = Number(0.15 *  cart.itemsPrice).toFixed(2)

     cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    return (
        <>
        <ToastContainer position="bottom-left" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
    <CheckOutStep step1 step2 step3 step4 />
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {' '}
                        {cart.shippingAddress.country}
                    </p>

                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong> {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? <Message variant='info'>Your Cart is Empty</Message> : <ListGroup variant='flush'>
                       {cart.cartItems.map((item, index)=> (
                           <ListGroup.Item key={index}>
                               <Row>
                                   <Col md={1}>
                                       <Image className='mb-2' src={item.image} alt={item.name} fluid rounded></Image>
                                   </Col>
                                   <Col>
                                   <Link  to={`/product/${item.product}`}>
                                       {item.name}
                                   </Link>
                                   </Col>
                                   <Col md={4}>
                                       {item.qty} x ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                   </Col>
                               </Row>

                           </ListGroup.Item>
                       ))}
                        </ListGroup>}
                </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3 className='text-center'>Order Summery</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Items
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {Number(cart.itemsPrice).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                          Shipping
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Tax
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {Number(cart.taxPrice).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Total Cost
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {(cart.totalPrice).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        
                        <Button type='button' onClick={placeorderHandler}
                        className='btn-block' disabled={cart.cartItems.length === 0}
                        >
                            Place Order
                        </Button>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
        </Col>
    </Row>

            
        </>
    )
}

export default PlaceOrderScreen
