import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
ORDER_LIST_MY_SUCCESS,
ORDER_LIST_MY_FAIL,
ORDER_LIST_REQUEST,
ORDER_LIST_SUCCESS,
ORDER_LIST_FAIL,
ORDER_DELIVER_REQUEST,
ORDER_DELIVER_SUCCESS,
ORDER_DELIVER_FAIL,
ORDER_DELIVER_RESET
} from '../constants/constants'
import axios from 'axios'
import { toast } from "react-toastify"


export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ 
        type: ORDER_CREATE_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/auth/order`, order, config)
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
      toast.success('Order Placed Successfully!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })

    } catch(err){
                dispatch({
                    type:  ORDER_CREATE_FAIL,
                    payload : { }
                })
                const errors = err.response.data.errors
                if(errors){
                    errors.forEach(error =>(
                        toast.error(error.msg, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            })
                    ) )
                }  
            }
  }

  
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: ORDER_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auth/order/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })

  } catch(err){
              dispatch({
                  type:  ORDER_DETAILS_FAIL,
                  payload : { }
              })
              const errors = err.response.data.errors
              if(errors){
                  errors.forEach(error =>(
                      toast.error(error.msg, {
                          position: "bottom-left",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          })
                  ) )
              }  
          }
}

  
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: ORDER_PAY_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/auth/order/${orderId}/pay`, paymentResult,config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })

  } catch(err){
              dispatch({
                  type:  ORDER_PAY_FAIL,
                  payload : { }
              })
              const errors = err.response.data.errors
              if(errors){
                  errors.forEach(error =>(
                      toast.error(error.msg, {
                          position: "bottom-left",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          })
                  ) )
              }  
          }
}

  
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: ORDER_DELIVER_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/auth/order/${order._id}/deliver`, {},config)

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })

  } catch(err){
              dispatch({
                  type:  ORDER_DELIVER_FAIL,
                  payload : { }
              })
              const errors = err.response.data.errors
              if(errors){
                  errors.forEach(error =>(
                      toast.error(error.msg, {
                          position: "bottom-left",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          })
                  ) )
              }  
          }
}



 
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: ORDER_LIST_MY_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auth/myorders`,config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })

  } catch(err){
              dispatch({
                  type:  ORDER_LIST_MY_FAIL,
                  payload : { }
              })
              const errors = err.response.data.errors
              if(errors){
                  errors.forEach(error =>(
                      toast.error(error.msg, {
                          position: "bottom-left",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          })
                  ) )
              }  
          }
}



export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: ORDER_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auth/order`,config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })

  } catch(err){
              dispatch({
                  type:  ORDER_LIST_FAIL,
                  payload : { }
              })
              const errors = err.response.data.errors
              if(errors){
                  errors.forEach(error =>(
                      toast.error(error.msg, {
                          position: "bottom-left",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          })
                  ) )
              }  
          }
}