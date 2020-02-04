const mongoose=require('mongoose')

const DB_URL="mongodb://localhost:27017/online-orders"

const cartSchema=mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    userId:String,
    productId:String,
    timestamp:Number
})

const CartItem=mongoose.model('cart',cartSchema)

exports.addNewItem=data=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
          return  CartItem.findOne({productId:data.productId})
        })
        .then(items=>{           
            if(items){
                data.amount=data.amount*1+items.amount*1
            return CartItem.updateOne({_id:items._id},data)
            }
            else{
  //              console.log(items)
                let item=new CartItem(data)
                return item.save()
            
            } 
        })
        .then(()=>{
            mongoose.disconnect()
            resolve()
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}



exports.getItemByUser=userId=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            // code 
          return  CartItem.find({userId:userId},{},{sort:{timestamp:0}})
        })
        .then(items =>{
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}



exports.editItem=(id,newDate)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           return CartItem.updateOne({_id:id},newDate)
        })
        .then(item=>{
            mongoose.disconnect()
            resolve(item)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.deleteItem=id=>{
   return new Promise((resolve,reject)=>{
    mongoose.connect(DB_URL)
    .then(()=>{
       return CartItem.findByIdAndDelete(id)
    })
    .then(item=>{
        mongoose.disconnect()
        resolve(item)

    })
    .catch(err=>{
        mongoose.disconnect()
        reject(err)
    })
})
}




exports.deleteAllItem=id=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(DB_URL)
     .then(()=>{
        return CartItem.deleteMany({})
     })
     .then(item=>{
         mongoose.disconnect()
         resolve(item)
 
     })
     .catch(err=>{
         mongoose.disconnect()
         reject(err)
     })
 })
 }