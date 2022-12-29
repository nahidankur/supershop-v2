import React, {useEffect, useState} from 'react'
import {Link, Redirect } from 'react-router-dom'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import Message from '../Message'
import RoundLoader from '../RoundLoader'
import { login} from '../../actions/userAction'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const LoginScreen = ({location, history}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo} = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
     if(userInfo){
        history.push(redirect)
     }
    }, [history, userInfo, redirect])

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(login(email, password))

    }
    const onChange = e =>{
        setFormData( { ...formData, [e.target.name]: e.target.value } )
    }

    return (
        <>
        <h1>Sign In</h1>
        <Card className='p-5'>
        <Row >
            <Col lg='10' >
            {error &&  <ToastContainer position="bottom-left" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />}
        {loading && <RoundLoader />}
            <Form onSubmit={e => onSubmit(e)} >
        <Form.Group controlId="formBasicEmail">
          <Form.Label><h5>Email address</h5></Form.Label>
          <Form.Control type="email" 
          name='email' value={email} onChange={e=> onChange(e)}
          placeholder="Enter Email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label><h5>Password</h5></Form.Label>
          <Form.Control
          name='password' value={password} onChange={e=> onChange(e)}
          type="password" placeholder="Enter Password" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
            </Col>
        </Row>
        <Row className='py-3'>
            <Col>
            Don't have an account?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : `/register` }>
            Register Here
            </Link>

            </Col>
        </Row>
        </Card>
        
      </>
    )
}

export default LoginScreen
