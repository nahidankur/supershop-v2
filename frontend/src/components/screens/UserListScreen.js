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
import {listUsers, deleteUser } from '../../actions/userAction'
import Loader from '../Loader'
import { deleteModel } from 'mongoose'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users } = userList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            history.push('/')
        }
       
    }, [dispatch, successDelete, history, userInfo])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure want to delete this user?')){
            dispatch(deleteUser(id))
        }

    }


    return (
        <>
           <ToastContainer position="bottom-left" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
        <h2>Users</h2>
        { loading? <Loader />: error ? <Message>Access Denied</Message> : (
            
             <Table striped bordered responsive hover className='table-sm'>
             <thead>
               <tr>
                 <th>ID</th>
                 <th>NAME</th>
                 <th>EMAIL</th>
                 <th>ADMIN</th>
                 <th></th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
                 { users.map(user=> (
                     <tr key={user._id}>
                         <td>{user._id}</td>
                         <td>{user.name}</td>
                         <td>{user.email}</td>
    
                         <td>
                             {user.isAdmin? (<i className='fas fa-check' style={{color: 'green'}}></i>): (
                                 <i className='fas fa-times' style={{color: 'red'}}></i>
                             )}
                         </td>
                         <td>
                             <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                 <Button variant='light' className='btn-sm'>
                                     <i className='fas fa-edit'></i>

                                 </Button>
                             </LinkContainer>
                             {' '} {' '}
                             <Button className='btn-sm' variant='danger' onClick={()=> deleteHandler(user._id)}>
                                 <i className='fas fa-trash'></i>
                             </Button>
                         </td>
                     </tr>
                     
                 )) }
             </tbody>
             </Table>
        )}
            
        </>
    )
}

export default UserListScreen
