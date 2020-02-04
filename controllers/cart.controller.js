const cartModel =require('../models/cart.model')

const validationResult=require('express-validator').validationResult


exports.getCart=(req,res,next)=>{
    cartModel.getItemByUser(req.session.userId).then(items=>{
        res.render('cart',{
            items:items,
            isUser:true,
            isAdmin:req.session.isAdmin,
            validationError:req.flash("validationError")[0],
            pageTitle:'Cart'
        })
    })
    .catch(err=>{
        next(err)
    })
}




exports.postCart=(req,res,next)=>{
    // return console.log(validationResult(req).array())
    //return console.log(validationResult(req)[0]+""+req.amount)
    if(validationResult(req).isEmpty()){
    //let data=
   
    cartModel.addNewItem({
        name:req.body.name,
        price:req.body.price,
        amount:req.body.amount,
        productId:req.body.productId,
        userId:req.session.userId,
        timestamp:Date.now()
    })
    .then(()=>{
        res.redirect("/cart")
    })
    .catch(err=>{
        next(err)
    })

}
else{
    req.flash('validationError',validationResult(req).array())
    res.redirect(req.body.redirectTo)
}
}




exports.postSave=(req,res,next)=>{
//    return console.log(validationResult(req).array())
 if(validationResult(req).isEmpty()){
    
    cartModel.editItem(req.body.cartId,
        {amount:req.body.amount,timestamp:Date.now()
    })
    .then(()=>res.redirect('/cart'))
    .catch(err=>next(err))
 }else{
     req.flash("validationError",validationResult(req).array())
     res.redirect('/cart')
 }
}


exports.postDelete=(req,res,next)=>{

    cartModel.deleteItem(req.body.cartId)
    .then((items)=>{
        console.log(items)
        res.redirect('/cart')
    })
    .catch(err=>next(err))
}



exports.postDeleteAll=(req,res,next)=>{

    cartModel.deleteAllItem(req.body.cartId)
    .then(()=>res.redirect('/cart'))
    .catch(err=>next(err))
}