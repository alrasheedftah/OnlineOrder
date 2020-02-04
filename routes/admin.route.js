const router=require('express').Router()
const bodyParser=require('body-parser')

const adminController=require('../controllers/admin.controller');

const adminGuard=require('./guards/admin.guard')


// multer for upload image 
const multer=require('multer')
// validation check
const check=require('express-validator').check
//

router.get('/add',adminGuard,
adminController.getAdd
)


router.get('/manage',adminGuard,
adminController.getManage
)




router.post('/add',adminGuard,
multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'images')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+'-'+file.originalname)
        }
    }),
}).single('image'),
check('image').custom((value,{req})=>{
    if(req.file)
    return req.file
    else
    throw "Image Is Required "
}),
adminController.postAdd
)

router.post('/save',
adminGuard,
bodyParser.urlencoded({extended:true}),
check('status').notEmpty()
.withMessage("Status Field Is Required ")
.isIn(["pinding","send","complete"]).withMessage(" Not Statuse Type "),
adminController.postSave
)


module.exports=router