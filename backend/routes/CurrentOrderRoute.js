import express from 'express'
const router= express.Router()
import Order from '../models/orderModel.js'
import {auth} from '../middleware/auth.js'


// route /api/auth/myorders
// Get Logged in user id
// Access: Private
router.get('/', auth, async (req, res)=>{
    try{
        const order  = await Order.find({ user: req.user._id })
            res.json(order)

    } catch(err){
        console.error(err)
        res.status(500).json({msg : 'Server Error'})
    }
    
})

export default router