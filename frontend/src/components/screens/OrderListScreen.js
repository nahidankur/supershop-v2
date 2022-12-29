import React, {useEffect, useState} from 'react'
import { Row, Col, Form, Button,Table, Card } from 'react-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import {LinkContainer } from 'react-router-bootstrap'
import Message from '../Message'
import RoundLoader from '../RoundLoader'
import { register} from '../../actions/userAction'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import {listOrders } from '../../actions/orderAction'
import Loader from '../Loader'

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders } = orderList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        } else {
            history.push('/')
        }
       
    }, [dispatch, history, userInfo])



    return (
        <>
           <ToastContainer position="bottom-left" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
        <h2>Orders</h2>
        { loading? <Loader />: error ? <Message>Access Denied</Message> : (
            
             <Table striped bordered responsive hover className='table-sm'>
             <thead>
               <tr>
                 <th>ID</th>
                 <th>USER</th>
                 <th>DATE</th>
                 <th>TOTAL</th>
                 <th>PAID</th>
                 <th>DELIVERED</th>
                 <></>
                 <th></th>
               </tr>
             </thead>
             <tbody>
                 { orders.map(order=> (
                     <tr key={order._id}>
                         <td>{order._id}</td>
                         <td>{order.user &&  order.user.name}</td>
                         <td>
                             {order.createdAt.substring(0, 10)}
                         </td>
                         <td>$ {(order.totalPrice).toFixed(2)}</td>
    
                         <td>
                             {order.isPaid ? (order.paidAt.substring(0,10)): (
                                 <i className='fas fa-times' style={{color: 'red'}}></i>
                             )}
                         </td>
                         
                         <td>
                             {order.isDelivered ? (order.deliveredAt.substring(0,10)): (
                                 <i className='fas fa-times' style={{color: 'red'}}></i>
                             )}
                         </td>
                         <td>
                             <LinkContainer to={`/order/${order._id}`}>
                                 <Button variant='light' className='btn-sm'>
                                   Details
                                 </Button>
                             </LinkContainer>
                             {' '} {' '}
                         </td>
                     </tr>
                     
                 )) }
             </tbody>
             </Table>
        )}
            
        </>
    )
}

export default OrderListScreen
