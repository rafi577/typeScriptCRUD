
//external modules
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

import { Request , Response } from 'express';


//internal modules
import schema from '../Schema/userSchema';


// const user = new mongoose.model('user',schema);
const user = mongoose.model('user', schema);


const router = express.Router();



interface userData{
    _id: String,
    fname: String,
    lname: String,
    email: String,
    phone: String,
    userType: String,
    status: String,
    createdAt: String
    updatedAt: String
}


//Creating user
router.post('/',async (req:Request,res:Response)=>{
    //cconsole.log(req.body);
    try{
        req.body.password = req.body.password ? req.body.password : ' ';
        const hashPassword = await bcrypt.hash(req.body.password,10);
        console.log(hashPassword);
        const newUser = new user({
            //_id: req.body._id, // auto generate it using mongoose
            fname: req.body.fname ? req.body.fname : '',
            lname: req.body.lname ? req.body.lname : '',
            email: req.body.email ? req.body.email : '',
            phone: req.body.phone ? req.body.phone : '',
            password: hashPassword,
            userType: req.body.userType,
            status: req.body.status,
        })
        console.log(newUser);
        await newUser.save();
        res.status(200).json({
            data : newUser,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        });
    }
})


router.get('/:id',async(req:Request, res:Response) => {
    try{
        const userInfo: userData | null = await user.findById(req.params.id).select('-password');
        if(userInfo){
            res.status(200).json({
                data : userInfo
            });
        }
        else {
            res.status(500).json({
                message : 'User not found'
            })
        }
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
})

/*
//get user by id
router.get('/:id', async (req: Request, res: Response) => {
    try {
      const userInfo = await user.findById(req.params.id);//findById

    //   delete userInfo.password;
      const userDetails = {...userInfo._doc }; 
      delete userDetails.password;
      console.log(userDetails.password);
      res.status(200).json({
        data: userDetails
      });
    } catch (err) {
      res.status(500).json({
        error: err
      });
    }
  });

*/




//update a user by his user id
router.put('/:id',async(req:Request,res:Response)=>{
    try{
        user.findByIdAndUpdate(req.params.id,req.body,async (err:Error,data:userData)=>{
            if(err){
                res.status(500).json({
                    error : err
                });
            }
            else{
                const updatedInfo = await user.findById(data._id);
                res.status(200).json({
                    data : updatedInfo
                })
            }
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
})




//delete user by Id
router.delete('/:id',async(req:Request,res:Response)=>{
    const userInfo = await user.findById(req.params.id);
    try{
        user.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(500).json({
                    error : "error deleting!"
                });
            }
            else{
                res.status(200).json({
                    data : userInfo,
                    message : "deleted successfully"
                })
            }
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
})


//Make an API to get a list of users using pagination
router.get('/',async(req:Request,res:Response)=>{
    try{
        const pageSize = Number(req.query.pageSize) || 1;
        const skip = Number(req.query.currentPage)  * (pageSize-1);
        const data = await user.find({})
        .skip(skip)
        .limit(pageSize)

        res.status(200).json({
            data : data,
            message : "success"
        })
    }
    catch(err:any){
        res.status(500).json({
            error : err
        })
    }

})


// module.exports = router;
export default router; // export the router as an ES6 module




function findById(id: string): userData | PromiseLike<userData> {
    throw new Error('Function not implemented.');
}

