import { createError } from "../error.js"
import User from "../backendProperties/Users.js"
import Video from "../backendProperties/Video.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can only update your account!"));
    }
  };
export const deleteUser = async (req,res,next) => {
   if( req.user.params === req.user.id){
       try {
           await User.findByIdAndDelete(
               req.params.id
           );
           res.status(200).json("User has been deleted!")
       }
       catch(err){
           next(err)
       }
   }else{
       return next(createError(403), "you can only delete your account!")
   }
}

export const getUser = async (req,res,next) => {
   if(req.params.id === req.user.id){
       try{
           const user =  await User.findById(req.params.id);
           res.status(200).json(user);
       } catch(err){
        next(err)
       }
   }
}

export const subscribe = async (req,res,next) => {
   try{
       await User.findByIdAndUpdate(req.user.id,{

    $pull:{
         subscribers: req.params.id
    
    },
});

await User.findByIdAndUpdate(req.params.id,{
    $inc: { subscribers: 1},
});
res.status(200).json("Subscribed to User!")
   } catch(err){
    next(err);
   }
}

export const save = async (req,res,next) => {
const id = req.user.id;
const videoId = req.params.videoId;
// use params as request paramaters
console.log(req.params)
console.log(req.user)
try{
await User.findByIdAndUpdate(id,{
  $addToSet:{saved:videoId}
})
res.status(200).json(videoId)
}catch(err){
  next(err);

}
}

export const getSaved = async (req,res) => {
const id = req.params.id
try{
  const user = await User.findById(id);
  const vidId = user.saved
  const videos = await Video.find({"_id": {"$in":  vidId}})
   
return res.status(200).json(videos)

}
catch(err){
  console.log(err)
  }
}