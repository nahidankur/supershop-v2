import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import Message from '../Message'
import RoundLoader from '../RoundLoader'
import Loader from '../Loader'
import { listProductDetails, updateProduct} from '../../actions/productAction'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import { PRODUCT_UPDATE_RESET} from '../../constants/constants'

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product} = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate
    useEffect(()=>{
          if(successUpdate){
              dispatch({type: PRODUCT_UPDATE_RESET})
              history.push('/admin/productlist')
          } else{
            if( !product || product._id !== productId ){
                dispatch(listProductDetails(productId))
             } else {
                 setName(product.name)
                 setPrice(product.price)
                 setImage(product.image)
                  setBrand(product.brand)
                  setCategory(product.category)
                  setDescription(product.description)
                  setCountInStock(product.countInStock)
            }
            

          }
      
           
                
    }, [product, dispatch, history, productId,successUpdate])

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name, price, image, brand,category, 
            description, countInStock
        }))
    }

    const uploadFileHandler = async (e)=>{
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)

      try{
        const config = {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        }

        const {data} = await axios.post(`/api/upload`, formData, config)
        setImage(data)
        setUploading(false)

      } catch(err){
        console.error(err)
        setUploading(false)

      }

    }
 
    return (
        <> 
        <Link to='/admin/productlist' className='btn btn-primary my-3' >
            Go Back
        </Link>
        {error && <ToastContainer
     position="bottom-left"
     autoClose={5000}
     hideProgressBar={false}
      newestOnTop={false}
     closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>}
        <h1>Edit Product</h1>
        
        { loading ? <Loader /> : error ? <Message>An Error Occured</Message>  : (
            <Card className='p-5'>
            <Row >
                <Col lg='10' >
            {loading && <RoundLoader />}
            {loadingUpdate && <RoundLoader />}
            {errorUpdate && <Message>An Error Occured</Message>}
                <Form onSubmit={e => onSubmit(e)} >
    
                <Form.Group >
              <Form.Label><h5>Product Name</h5></Form.Label>
              <Form.Control
               value={name} onChange={e=> setName(e.target.value)}
              type="text" placeholder="Product Name"  />
            </Form.Group>
            
            <Form.Group >
              <Form.Label><h5>Product Price</h5></Form.Label>
              <Form.Control
               value={price} onChange={e=> setPrice(e.target.value)}
              type="number" placeholder="Product Price"  />
            </Form.Group>
            
            <Form.Group >
            <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File id='image-file' label='Choose Image' custom
              onChange={uploadFileHandler}></Form.File>
              {uploading && <RoundLoader />}
            </Form.Group>
            
            <Form.Group >
              <Form.Label><h5>Product Brand</h5></Form.Label>
              <Form.Control
               value={brand} onChange={e=> setBrand(e.target.value)}
              type="text" placeholder="Product Brand"  />
            </Form.Group>
            
            <Form.Group >
              <Form.Label><h5>Product Category</h5></Form.Label>
              <Form.Control
               value={category} onChange={e=> setCategory(e.target.value)}
              type="text" placeholder="Product Category"  />
            </Form.Group>
            
            <Form.Group >
              <Form.Label><h5>Product Stock</h5></Form.Label>
              <Form.Control
               value={countInStock} onChange={e=> setCountInStock(e.target.value)}
              type="number" placeholder=" Set Product Stock"  />
            </Form.Group>
            
            <Form.Group >
              <Form.Label><h5>Product Description</h5></Form.Label>
              <Form.Control
               value={description} onChange={e=> setDescription(e.target.value)}
              type="text" placeholder="Product Description"  />
            </Form.Group>
            
          
          
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
                </Col>
            </Row>
            </Card>

        )  }
        
      </>
    )
}

export default ProductEditScreen
