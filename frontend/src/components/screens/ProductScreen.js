import React, {useEffect, useState} from 'react'
import { Link} from 'react-router-dom'
import {Row, Col, Button, Image, Card, ListGroup, Form } from 'react-bootstrap'
import Rating from '../Rating'
import { listProductDetails, createProductReview} from '../../actions/productAction'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import {PRODUCT_CREATE_REVIEW_RESET } from '../../constants/constants'


const ProductScreen = ({match, history}) => {
     const [qty, setQty] = useState(1)
     const [rating, setRating] = useState(0)
     const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error} = productDetails

    const productCreateReview = useSelector(state => state.productCreateReview)
    const { success: successProductReview , error: errorProductReview} = productCreateReview

    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin



    useEffect(()=>{
        if(successProductReview){
            toast.success('Review Added!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))

    }, [match, dispatch,successProductReview])

    const addtoCartHandler = ()=>{
       history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

   

    const sumbitHandler = (e)=>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, comment
        }))
    }

    return (
       <>
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
       <Link className='btn btn-primary my-3' to='/'>
           Go Back
       </Link>
       { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: 
       <>
       <Row>
           <Col md={6}>
               <Image src={product && product.image} alt={product && product.name} fluid />
            
           </Col>

           <Col md={3}>
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                       <h2>{product && product.name}</h2>
                       </ListGroup.Item>
                    <ListGroup.Item>
                    <Rating value={product && product.rating} text={`${product && product.numReviews} reviews`}/>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Price : </strong> ${product && product.price}

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description : </strong> {product && product.description}

                    </ListGroup.Item>

               </ListGroup>
           </Col>

           <Col md={3}>
               
                   <ListGroup>
                       <ListGroup.Item>
                            <strong>Price : </strong> ${product && product.price}
                           </ListGroup.Item>
                           <ListGroup.Item>
                           <strong>Status : </strong> {product && product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                           </ListGroup.Item>
                           {product.countInStock > 0 && (
                                   <ListGroup.Item>
                                       <strong>Qty</strong>
                                       <Form.Control as='select' value={qty} onChange={e=> setQty(e.target.value)}> 
                                  {
                                      [...Array(product.countInStock).keys()].map(x => (
                                          <option key={x+1} value={x+1} >
                                              {x+1}

                                          </option>
                                      ))
                                  }


                                  </Form.Control>
           
                               </ListGroup.Item>

                           )}

                           <ListGroup.Item>
                               <Button
                               onClick={addtoCartHandler}
                               className='btn btn-info btn-block' disabled={product && product.countInStock === 0}>
                                   Add to Cart
                               </Button>
                           </ListGroup.Item>
                   </ListGroup>

           </Col>
       </Row>  
       <Row>
           <Col md={6}>
               <h2> Reviews</h2>
               {product.reviews.length === 0 && <Message>No Review</Message>}
               <ListGroup variant='flush'>
                   {product.reviews.map(review=>(
                       <ListGroup.Item key='review._id'>
                           <strong>{review.name}</strong>
                           <Rating value={review.rating} />
                           <p>{review.createdAt.substring(0,10)}</p>
                           <p>{review.comment}</p>

                       </ListGroup.Item>
                   ))}

                   <ListGroup.Item>
                       <h2>Write a Customer Review</h2>
                       {errorProductReview && <Message variant='info'>You can write one review per product</Message>}
                       {userInfo? (
                           <Form onSubmit={sumbitHandler}>
                               <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>

                                <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                               </Form.Group>
                            <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as='textarea'
                            onChange={e=> setComment(e.target.value)}
                            row='3'
                            >

                            </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'  >
                                Submit

                            </Button>
                           </Form>
                       ) : (<Message>Please <Link to='/login'>Sign In</Link> to Write a review </Message>)}
                   </ListGroup.Item>

               </ListGroup>
           </Col>
       </Row>
       </>
       }
       
       
       </>
    )
}

export default ProductScreen

