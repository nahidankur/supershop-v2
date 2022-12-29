import express from 'express'
const router= express.Router()
import Order from '../models/orderModel.js'
import {auth, admin} from '../middleware/auth.js'


// route /api/auth/order
// Create new Order
// Access: Private
router.post('/', auth, async (req, res)=>{
    try{
        const {orderItems, shippingAddress, paymentMethod, taxPrice,
            shippingPrice, totalPrice, itemsPrice
        }  = req.body

        if(orderItems && orderItems.length === 0){
            res.status(400).json({msg: 'No Order items'})
        } else{
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress, paymentMethod, taxPrice,
            shippingPrice, totalPrice, itemsPrice
            })

            const createdOrder =  await order.save()
            res.status(201).json(createdOrder)
        }

        

    } catch(err){
        console.error(err)
        res.status(500).json({msg : 'Server Error'})
    }
    
})


// route /api/auth/order/:id
// Get Order by ID
// Access: Private
router.get('/:id', auth, async (req, res)=>{
    try{
        const order  = await Order.findById(req.params.id).populate('user', 'name email')
        
        if(order){
            res.json(order)
        } else {
            res.json({msg: 'Order Not Found'})
        }
        

    } catch(err){
        console.error(err)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Order Not Found'})
        }
        res.status(500).json({msg : 'Server Error'})
    }
    
})



// route /api/auth/order/:id/pay
// Update Order to paid
// Access: Private
router.put('/:id/pay', auth, async (req, res)=>{
    try{
        const order  = await Order.findById(req.params.id)
        if(order){
           order.isPaid = true
           order.paidAt = Date.now()
           order.paymentResult = {
               id: req.body.id,
               status: req.body.status,
               update_time: req.body.update_time,
               email_address: req.body.payer.email_address
           }
          
           const updatedOrder = await order.save()
           res.json(updatedOrder)

        } else {
            res.json({msg: 'Order Not Found'})
        }
        

    } catch(err){
        console.error(err)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Order Not Found'})
        }
        res.status(500).json({msg : 'Server Error'})
    }
    
})



// route /api/auth/order/:id/deliver
// Update Order to paid
// Access: Private
router.put('/:id/deliver', auth, admin, async (req, res)=>{
    try{
        const order  = await Order.findById(req.params.id)
        if(order){
           order.isDelivered = true
           order.deliveredAt = Date.now()
          
           const updatedOrder = await order.save()
           res.json(updatedOrder)

        } else {
            res.json({msg: 'Order Not Found'})
        }
        

    } catch(err){
        console.error(err)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Order Not Found'})
        }
        res.status(500).json({msg : 'Server Error'})
    }
    
})

// route /api/auth/order
// Get All Order
// Access: Private
router.get('/', auth, admin, async (req, res)=>{
    try{
        const orders = await Order.find({}).populate('user', 'id name')
       res.json(orders)
        

    } catch(err){
        console.error(err)
        res.status(500).json({msg : 'Server Error'})
    }
    
})





export default router