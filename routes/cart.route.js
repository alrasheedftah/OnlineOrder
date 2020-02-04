const router=require('express').Router();

const bodyParser=require('body-parser')

const cartController=require('../controllers/cart.controller')

const authGuard=require('./guards/auth.guard')

const check=require('express-validator').check

router.get('/',
authGuard.isAuht,
cartController.getCart
)

router.post('/',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage("Card Is Required ")
.isInt({min:1}).withMessage('Amount Must Be Greater Than Zero'),
cartController.postCart
)

router.post('/save',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage("Card Is Required ")
.isInt({min:1}).withMessage('Amount Must Be Greater Than Zero'),
cartController.postSave
)


router.post('/delete',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
cartController.postDelete
)


router.post('/delete-all',
authGuard.isAuht,
bodyParser.urlencoded({extended:true}),
cartController.postDeleteAll
)


module.exports=router