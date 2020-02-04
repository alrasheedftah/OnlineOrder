const mongoose=require('mongoose')

const DB_URL="mongodb://localhost:27017/online-orders"

const productScheema=mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    category:String,
    description:String
})

const product=mongoose.model("product",productScheema)

exports.getAllProducts=()=>{


    return new Promise((resolve,reject)=>{

    // connect to my db
        mongoose.connect(DB_URL).then(()=>{ 
            return  product.find({})  // get products
          }).then(products=>{
              mongoose.disconnect()  // disconnect
              resolve(products)
          }).catch(err=>reject(err))
      
    })

}


exports.getProductsByCategory=(category)=>{


    return new Promise((resolve,reject)=>{

    // connect to my db
        mongoose.connect(DB_URL).then(()=>{ 
            return  product.find({category:category})  // get products
          }).then(products=>{
              mongoose.disconnect()  // disconnect
              resolve(products)
          }).catch(err=>reject(err))
      
    })

}



exports.getProductsById=(id)=>{


    return new Promise((resolve,reject)=>{

    // connect to my db
        mongoose.connect(DB_URL).then(()=>{ 
            return  product.findById(id)  // get products
          }).then(products=>{
              mongoose.disconnect()  // disconnect
              resolve(products)
          }).catch(err=>reject(err))
      
    })

}



exports.getFirst=()=>{


    return new Promise((resolve,reject)=>{

    // connect to my db
        mongoose.connect(DB_URL).then(()=>{ 
            return  product.findOne({})  // get products
          }).then(products=>{
              mongoose.disconnect()  // disconnect
              resolve(products)
          }).catch(err=>reject(err))
      
    })

}




exports.addNewProduct=data=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           let newProduct=new product(data)
          return newProduct.save()
        })
        .then(data=>{
            mongoose.disconnect()
            resolve(data)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}