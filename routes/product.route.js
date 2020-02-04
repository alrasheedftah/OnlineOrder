const router=require('express').Router()

// import controller 
const productController=require('../controllers/product.controller')

router.get('/',productController.getFirstProduct)
router.get('/:id',productController.getPoduct)

module.exports=router