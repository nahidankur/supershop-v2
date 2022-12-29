import React, { useEffect } from 'react'
import { addTocart, removeCart} from '../../actions/cartAction'
import { useDispatch, useSelector} from 'react-redux'
import {Row, Col, Card, ListGroup, Image, Form, Button } from 'react-bootstrap'
import Message from '../Message'
import {Link } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"

const CartScreen = ({match, history, location}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems } = cart

    useEffect(()=>{
        if(productId){
            dispatch(addTocart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeCartHandler = (id)=>{
        dispatch(removeCart(id))
    }

    const checkOutHandler = ()=>{
       history.push(`/login?redirect=shipping`)
    }

    return (
       <Row>
                <ToastContainer
     position="bottom-left"
     autoClose={5000}
     hideProgressBar={false}
      newestOnTop={false}
     closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
           <Col md={8} >
               <h1>Shopping Cart</h1>
               {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'> Go Back </Link> </Message> : <ListGroup variant='flush'>
               { cartItems.map((item)=> (
                <ListGroup.Item key={item.product}>
                    <Row>
                        <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded  />
                        </Col>
                        <Col md={3} >
                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                        <Form.Control as='select' value={item.qty} onChange={e=> dispatch(addTocart(item.product, Number(e.target.value))) }> 
                                  {
                                      [...Array(item.countInStock).keys()].map(x => (
                                          <option key={x+1} value={x+1} >
                                              {x+1}

                                          </option>
                                      ))
                                  }
                                  </Form.Control>
                        </Col>

                        <Col md={2}>
                            <Button  variant='primary' type='button' onClick={()=> removeCartHandler(item.product)} >
                                <i className='fas fa-trash' ></i>

                            </Button>
                        </Col>
                    </Row>

                </ListGroup.Item>
            )) }
               </ListGroup> }

           </Col>

           <Col md={4}>
               <Card>
                   <ListGroup variant='flush' >
                       <ListGroup.Item>
                           <h2 > Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0) }) items </h2>
                           ${cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)}
                       </ListGroup.Item>

                       <ListGroup.Item>
                           <Button variant='info' className='btn-block' disabled ={ cartItems.length ===0 } type='button' onClick={checkOutHandler}>
                               Proceed to Checkout
                           </Button>

                       </ListGroup.Item>

                   </ListGroup>
               </Card>
           </Col>
       </Row>
    )
}

export default CartScreen


