import User from '../models/userModel.js'
import express from 'express'
const router  = express.Router()
import {body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import {auth, admin } from '../middleware/auth.js'
import generateToken from '../utils/generateToken.js'

// route /api/auth/register
// Register new user
// Access: Public
router.post('/register',[
    body('name', 'Please include a name').not().isEmpty(),
    body('email', 'Please include a valid email address').isEmail(),
    body('password', 'Password must be at least 6 character').isLength({min: 6})
], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
     }
     const { name, email, password } = req.body 

     try{
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ errors : [{ msg: 'The Email is Already Taken' }] })
        }

        user = new User({
            name, email, password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
 
        await user.save()
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          })
 
  
     } catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server Error' })
    }
  
})

// route /api/auth/login
// Log in user
// Access: Public
router.post('/login',[
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password required').exists()
], async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try{
       
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ errors : [{ msg : 'Invalid Credentials' }] })
        }

        const isMatch =  await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors : [{ msg : 'Invalid Credentials' }] })
        }

        if(user && isMatch){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
              })

        }

    } catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server Error' })
    }

})

// route /api/auth/profile
// Get current login user profile
// Access: Private
router.get('/profile',auth, async (req, res)=>{
   try{
   const user = await User.findById(req.user._id)

   if(user){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      })

   } else {
    res.status(400).json({ errors : [{ msg : 'No User Found!' }] })
   }
   }
    catch(err){
    console.error(err)
    res.status(500).json({ msg: 'Server Error' })
}

})


 // route /api/auth/profile
// Update User Profile
// Access: Private
router.put('/profile', [auth], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
     }
      
     try{
        const user = await User.findById(req.user._id)
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
  
            if(req.body.password){
               const givenpassword = req.body.password
               const salt = await bcrypt.genSalt(10)
               user.password = await bcrypt.hash(givenpassword, salt)
            }
           
  
            const updatedUser = await user.save()
  
            res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin,
              token: generateToken(updatedUser._id),
            })
  
        } else{
          res.status(400).json({ errors : [{ msg : 'No User Found!' }] })
        }

     }catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server Error' })
    }

})

 // route /api/auth
// Get All User Admin Only
// Access: Private/Admin
router.get('/', auth, admin, async (req, res)=>{
    try{
        const users = await User.find({})

        if(users){
            res.status(200).json(users)
        } else{
            res.status(400).json({msg: 'No User Found!'})
        }

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error'})
    }
})

 // route /api/auth/users/:id
// Get All User Admin Only
// Access: Private/Admin
router.delete('/users/:id', auth, admin, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(user){
            await user.remove()
            res.status(201).json({msg: 'User Removed'})
        } else{
            res.status(400).json({msg: 'No User Found!'})
        }

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error'})
    }
})


 // route /api/auth/users/:id
// Get User by Id
// Access: Private/Admin
router.get('/users/:id', auth, admin, async(req, res)=>{
    try{
        const user = await User.findById(req.params.id).select('-password')

        if(user){
            res.status(200).json(user)
        } else {
            res.status(400).json({msg: 'No User Found!'})
        }

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error'})
    }
})



 // route /api/auth/users/:id
// Update User by Admin by Is
// Access: Private
router.put('/users/:id', [auth, admin], async (req, res)=>{
  
     try{
        const user = await User.findById(req.params.id)
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.isAdmin = req.body.isAdmin
  
        
            const updatedUser = await user.save()
  
            res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin
            })
  
        } else{
          res.status(400).json({ errors : [{ msg : 'No User Found!' }] })
        }

     }catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server Error' })
    }

})

export default router
