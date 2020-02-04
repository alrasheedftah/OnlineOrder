const router=require('express').Router();

const bodyParser=require('body-parser')

const OrderController=require('../controllers/order.controller')

const authGuard=require('./guards/auth.guard')

const check=require('express-validator').check


router.get('/',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
OrderController.getOrders
)


router.post('/',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
check('address').not().isEmpty().withMessage("Address Is Required ")
.isLength({min:5}).withMessage('Write Address Line And City '),
OrderController.postOrder
)


router.post('/verfied',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
OrderController.getVerfied
)



router.post('/delete',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
OrderController.postDelete
)


router.post('/delete-all',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
OrderController.postDeleteAll
)

module.exports=router
