
const express=require('express')
const path=require('path')

// import session 
const session=require('express-session')
const SessionStore=require('connect-mongodb-session')(session)

// flash session 
const flash=require('connect-flash')
///


// use my routers

const homeRouter=require('./routes/home.route')
const productRouter=require('./routes/product.route')
const authRouter=require('./routes/auth.route')
const cartRouter=require('./routes/cart.route')
const orderRouter=require('./routes/order.router')
const adminRouter=require('./routes/admin.route')
const app=express()


app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

/// use flash session ass middelware
app.use(flash())
//

// use check validatore as middleware

//

// make store session 
const STORE=new SessionStore({
    url:"mongodb://localhost:27017/online-orders",
    databaseName:'online-orders',
    collection:'sessions'
})

STORE.on('error', function(error) {
    console.log(error);
  });
   

///  use Stor Session 

app.use(session({
    secret:"this is my secrecet key ",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
    ,
    clear_interval: 3600,
    store:STORE
    
}))



app.set('view engine','ejs')
app.set('views','views') //defualt

// app.get('/',(req,res,next)=>{
//     res.render('index')
// })
app.use('/',homeRouter)
app.use('/',authRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/admin',adminRouter)
app.get('/error',(req,res,next)=>{
    res.render('error',{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        pageTitle:'Error'
    })
})

app.use((error,req,res,next)=>{
    res.status(500)
    res.redirect('/error')
})

app.get('/not-admin',(req,res,next)=>{
    res.status(403)
    res.render('not-admin',{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        pageTitle:'Error'
    })
})


app.listen(3000,()=>{
    console.log("connecting with serve on port 3000 ")
})