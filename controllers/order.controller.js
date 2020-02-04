const OrderModel=require('../models/order.model')
const CartModel=require('../models/cart.model')

const validationResult=require('express-validator').validationResult

exports.postOrder=(req,res,next)=>{
    console.log("cartId  :  "+req.body.cartId)

  CartModel.deleteItem(req.body.cartId)
  .then(items=>{
      console.log(items)
        if(items)
        return data={name:items.name,
            amount:items.amount,
            cost:items.price*items.amount,
            address:req.body.address,
            time:Date.now(),
            userId:req.session.userId
        }

  }).then(data=>{
      OrderModel.createNewOrder(data)
      .then(()=>res.redirect('/order'))
      .catch(err=>next(err))
  })
}


exports.getOrders=(req,res,next)=>{
    
    OrderModel.getOrderByUser(req.session.userId)
    .then(orders=>{
        res.render('order',{
            orders:orders,
            isUser:true,
            isAdmin:req.session.isAdmin,
            pageTitle:'Order'

        })
    })
}



exports.getVerfied=(req,res,next)=>{
    let cartId=req.body.cartId
    res.render('verfied-orders',{
        cartId:cartId,
        isUser:true,
        isAdmin:req.session.isAdmin,
        validationError:req.flash('validationError')
    })
  //let data={name:req}   
}


exports.postDelete=(req,res,next)=>{

    OrderModel.deleteItem(req.body.orderId)
    .then(()=>{
        res.redirect('/order')
    })
    .catch(err=>{
        next(err)
    })

}



exports.postDeleteAll=(req,res,next)=>{

    OrderModel.deleteAllItem(req.body.orderId)
    .then(()=>{
        res.redirect('/order')
    })
    .catch(err=>{
       next(err)
    })

}
