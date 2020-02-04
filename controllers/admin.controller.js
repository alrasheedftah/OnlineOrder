const ProductModel=require('../models/products.model')
const OrderModel=require('../models/order.model')

const validationResult=require('express-validator').validationResult

exports.getAdd=(req,res,next)=>{
    res.render("add-product",{
        validationError:req.flash("validationError"),
        isUser:true,
        isAdmin:true,
        pageTitle:'Add Product'
    })

}


exports.postAdd=(req,res,next)=>{
   if(validationResult(req).isEmpty){
    
    ProductModel.addNewProduct({
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        image:req.file.filename /// multer added field in req named file contain info about file 
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch(err=>{
        next(err)
    })

   }else{
       require.flash("validationError",validationResult(req).array())
       res.redirect('/admin/add')
   }
}





exports.getManage=(req,res,next)=>{
    let status=req.query.status

    let OrderPromise=OrderModel.getOrderByStatu(status)
    if(!status)
    OrderPromise=OrderModel.getAll()

    OrderPromise
    .then(orders=>{
        res.render('order-manage',{
            orders:orders,
            isUser:true,
            isAdmin:true,
            pageTitle:'Manage Order',
            validationError:req.flash("validationError")[0]
        })
    })
    .catch(err=>{
        next(err)
    })


}


exports.postSave=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
    OrderModel.editItem(req.body.orderId,req.body.status)
    .then(()=> res.redirect('/admin/manage'))
    .catch(err=> console.log(err))
    }
    else{
        req.flash("validationError",validationResult(req).array())
        res.redirect('/admin/manage')
    }

}

