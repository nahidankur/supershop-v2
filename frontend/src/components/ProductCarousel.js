import React, {useEffect} from 'react'
import { Carousel, Image} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import Loader from './Loader'
import { listTopProducts} from '../actions/productAction'
import Message from './Message'
import {useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products} =productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    }, [dispatch])
    return (
        loading ? <Loader/> : error ? <Message>An Error Occured</Message> : (
            <Carousel pause='hover' className='bg-color'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image className='circle' src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} ${product.price}</h2>
                            </Carousel.Caption>
                        </Link>

                    </Carousel.Item>
                ))}

            </Carousel>
        )
    )
}

export default ProductCarousel





