import express from 'express'
const router= express.Router()
import Product from '../models/productModel.js'
import { auth, admin} from '../middleware/auth.js'

// route /api/products
// Fetch All products
// Access: Private
router.get('/', async (req, res)=>{
    try{
        const pageSize = 10
        const page = Number(req.query.pageNumber) || 1
      const keyword = req.query.keyword ? {
          name: {
              $regex: req.query.keyword,
              $options: 'i'
          }
      } : { }
        
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
        res.json({products, page, pages : Math.ceil(count / pageSize)})

    } catch(err){
        console.error(err)
        res.status(500).json({msg : 'Server Error'})
    }
    
})

// route /api/products/:id
// Fetch Single products
// Access: Private
router.get('/:id', async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            res.json(product)
        } else{
            res.status(404).json({msg: 'Product not found'})
        }

    }catch(err){
        console.error(err)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post Not Found'})
        }
        res.status(500).json({msg: 'Server Error' })
    }

})

// route /api/products/:id
// Delete Product
// Access: Private
router.delete('/:id', auth, admin, async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            await product.remove()
            res.status(201).json({msg: 'Product Removed Successfully'})
        } else{
            res.status(400).json({msg: 'Product Not Found'})
        }

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
})



// route /api/products
// Create Product
// Access: Private
router.post('/', auth, admin, async (req, res)=>{
    try{
        const product = new Product({
            name: 'sample name',
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'sample brand',
            category: 'sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'sample description'
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
      

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
})


// route /api/products/:id
// Update Product
// Access: Private
router.put('/:id', auth, admin, async (req, res)=>{
    try{
      const {name,price, image,brand,category,countInStock, numReviews,description} = req.body

      const product = await Product.findById(req.params.id)

      if(product){
          product.name = name || product.name
          product.image = image || product.image
          product.brand = brand || product.brand
          product.category = category || product.category
          product.countInStock = countInStock || product.countInStock
          product.numReviews = numReviews || product.numReviews
          product.description = description || product.description
          product.price = price || product.price

          const updatedProduct = await product.save()
          res.json(updatedProduct)

      } else{
          res.status(404).json({msg: 'Product Not Found'})
      }

      

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
})




// route /api/products/:id/review
// Create a  Review
// Access: Private
router.post('/:id/reviews', auth, async (req, res)=>{
    try{
        const { rating, comment } = req.body

        const product = await Product.findById(req.params.id)
      
        if (product) {
          const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
          )
      
          if (alreadyReviewed) {
            res.status(400)
            res.status(404).json({msg: 'Product Already Reviewed'})
          }
      
          const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
          }
      
          product.reviews.push(review)
      
          product.numReviews = product.reviews.length
      
          product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length
      
          await product.save()
          res.status(201).json({ message: 'Review added' })
        } else {
          res.status(404)
          res.status(404).json({msg: 'Product Not Found'})
        }


    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
})

// route /api/products/top
// Get Top rated Products
// Access: Public
router.get('/top/products',async (req, res)=>{
    try{
        const products = await Product.find({}).sort({rating: -1}).limit(3)
        res.json(products)

    } catch(err){
        console.error(err)
        res.status(500).json({msg: 'Server Error' })
    }
    

})

export default router