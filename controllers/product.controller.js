const productsModel=require('../models/products.model')

exports.getPoduct=(req,res,next)=>{
    //get Id 
    // 
    // get Product 
    // render

    let id=req.params.id

    productsModel.getProductsById(id).then(product=>{
        res.render('product',{
            product:product,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTitle:'Home'
        })
    })
}


exports.getFirstProduct=(req,res,next)=>{
    productsModel.getFirst().then(product=>{
        res.render('product',{
            product:product,
            isAdmin:req.session.isAdmin
        })
    })
}


