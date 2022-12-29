// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()

// export const auth = async (req, res, next)=>{
//     const token = req.header('x-auth-token')

//     // if not token
//     if(!token){
//         return res.status(401).json({msg : 'No Token, Access Denied'})
//     }

//     // Verify Token
//     try{
//         jwt.verify(token, process.env.jwtSecret, (error, decoded)=>{
//             if(error){
//                 return res.status(401).json({ msg: 'Invalid Token' })
//             }

//             req.user = decoded.user
//             next()
//         } )

//     } catch(err){
//         console.error(err)
//         res.status(500).json({ msg : 'Server Error' })
//     }
    
// }



import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()

const auth = async (req, res, next) => {

    try{
        let token

        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          try {
            token = req.headers.authorization.split(' ')[1]
      
            const decoded = jwt.verify(token, process.env.jwtSecret)
      
            req.user = await User.findById(decoded.id).select('-password')
      
            next()
          } catch (error) {
            console.error(error)
            res.status(401)
            res.json({msg: 'No Token, Authorization Error'})
          }
        }
      
        if (!token) {
          res.status(401)
          res.json({msg: 'No Token, Authorization Error'})
        }

    } catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server Error' })
    }

}


const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    res.json({msg: 'Admin Permission Required! Access Denied!'})
  }
}

export { auth, admin }
