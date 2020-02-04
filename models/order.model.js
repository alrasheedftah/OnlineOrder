const mongoose=require('mongoose')

const DB_URL="mongodb://localhost:27017/online-orders"

const orderSchema=mongoose.Schema({
    name:String,
    amount:Number,
    cost:Number,
    address:String,
    status:{
        type:String,
        defualt:'pending'
    },
    time:String,
    userId:String,
    timestamp:Number
})

const OrderModel=mongoose.model('order',orderSchema)


exports.createNewOrder=data=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            let order=new OrderModel(data)
            return order.save()
        }).then(order=>{
            mongoose.disconnect()
            resolve(order)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.getOrderByUser=userId=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            return OrderModel.find({userId:userId},{},{sort:{timestamp:1}})
        })
        .then(orders=>{
            mongoose.disconnect()
            resolve(orders)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })

}



exports.deleteItem=id=>{
  return  new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           return OrderModel.findByIdAndDelete({_id:id})
        })
        .then(order=>{
            mongoose.disconnect()
            resolve(order)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}




exports.deleteAllItem=id=>{
  return    new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           return  OrderModel.deleteMany({})
        })
        .then(orders=>{
            mongoose.disconnect()
            resolve(orders)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}



exports.getAll=()=>{
    return new Promise((resolve,reject)=>{
        return reject(err)
        mongoose.connect(DB_URL)
        .then(()=>{
          return  OrderModel.find({})
        })
        .then(orders=>{
            mongoose.disconnect()
            resolve(orders)

        })
        .catch(err=>{
            reject(err)
        })

    })
}



exports.editItem=(id,newStatus)=>{
    return  new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           return OrderModel.updateOne({_id:id},{status:newStatus})
        })
        .then(order=>{
            mongoose.disconnect()
            resolve(order)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}




exports.getOrderByStatu=status=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
          return  OrderModel.find({status:status})
        })
        .then(orders=>{
            mongoose.disconnect()
            resolve(orders)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}