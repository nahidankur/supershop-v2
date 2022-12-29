import React, {useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Product from '../../components/Product'
import { listProduct} from '../../actions/productAction'
import Loader from '../Loader'
import Message from '../Message'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Paginate from '../Paginate'
import ProductCarousel from '../ProductCarousel'

const HomeScreeen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

      const dispatch = useDispatch()

      useEffect(()=>{
          dispatch(listProduct(keyword, pageNumber))
      }, [dispatch, keyword, pageNumber])

      const productList = useSelector(state => state.productList)
      const {loading,pages, page, error, products } = productList
    return (
       <>
       {!keyword && <ProductCarousel />}
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

       <h1>Latest Products</h1>
       { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:    
       <>
       <Row>
           { products.map(product => (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
               <Product product={product} />
               </Col>
           ))}
       </Row>
       <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
       </>
         }
    

       </>
    )
}

export default HomeScreeen
