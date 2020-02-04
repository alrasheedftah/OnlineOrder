const ProductModel=require('../models/products.model')

exports.getHome=(req,res,next)=>{
    

    // get Category
    // if category  && category != all  then felter else render all 

    let category=req.query.category
    let validCategory=['clothes','phones','computers']
    let productsPromise
    if(category && validCategory.includes(category)) // or this  if(category && category!="all") 
    productsPromise=ProductModel.getProductsByCategory(category) // define one promise to smallest code 
    else
    productsPromise=ProductModel.getAllProducts()
    
    productsPromise.then(products=>{
        // console.log(products)
        res.render('index',{//render index.js
            products:products,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            validationError:req.flash('validationError')[0],
            pageTitle:'Home'

        })
    })
    
    

}

/* if(category && category!="all"){
        ProductModel.getProductsByCategory(category).then(products=>{
            res.render('index',{
                products:products
            })
        })
    }
    else{
        //get Products
    ProductModel.getAllProducts().then(products=>{
        // console.log(products)
        res.render('index',{//render index.js
            products:products
        })
    })
     */