import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import Message from '../Message'
import RoundLoader from '../RoundLoader'
import { register} from '../../actions/userAction'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"

const RegisterScreen = ({location, history}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password,password2 } = formData

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo} = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
     if(userInfo){
        history.push(redirect)
     }
    }, [history, userInfo, redirect])

    const onSubmit = (e)=>{
        e.preventDefault()
        if(password !== password2){
            setMessage(toast.error('Password Did Not Match', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }))
        }
        else{
            dispatch(register(name,email, password))
        }
    }
    const onChange = e =>{
        setFormData( { ...formData, [e.target.name]: e.target.value } )
    }

    return (
        <>
       {error && <ToastContainer
position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>}  
{message && <ToastContainer
     position="bottom-left"
     autoClose={5000}
     hideProgressBar={false}
      newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
        draggable
        pauseOnHover
/>}
        <h1>Sign Up</h1>
        <Card className='p-5'>
        <Row >
            <Col lg='10' >
        {loading && <RoundLoader />}
            <Form onSubmit={e => onSubmit(e)} >

            <Form.Group >
          <Form.Label><h5>Your Full Name</h5></Form.Label>
          <Form.Control
          name='name' value={name} onChange={e=> onChange(e)}
          type="text" placeholder="Enter Name"  />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label><h5>Email address</h5></Form.Label>
          <Form.Control type="email" 
          name='email' value={email} onChange={e=> onChange(e)}
          placeholder="Enter Email"  />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label><h5>Password</h5></Form.Label>
          <Form.Control
          name='password' value={password} onChange={e=> onChange(e)}
          type="password" placeholder="Enter Password"  />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label><h5>Confirm Password</h5></Form.Label>
          <Form.Control
          name='password2' value={password2} onChange={e=> onChange(e)}
          type="password" placeholder="Enter Password Again"  />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
            </Col>
        </Row>
        <Row className='py-3'>
            <Col>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : `/login` }>
            Login Here
            </Link>

            </Col>
        </Row>
        </Card>
        
      </>
    )
}

export default RegisterScreen
