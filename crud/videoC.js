import User from "../backendProperties/Users.js";
import Video from "../backendProperties/Video.js";
import { createError } from "../error.js";


export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};



export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
   next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const deleteSaved = async (req,res)=> {
  const id = req.params.id;
  const userId = req.user.id;
  
    try{
      const user = await User.findById(userId);
      const video = await Video.findById(user.saved);
      const del = await User.updateOne(user,{"id": id, $pull:{saved:video._id}});   
      
      return res.status(200).json(`Video named: ${video.title} has been deleted from saved!`)  
      
    } catch(err){
  console.log(err)
    }
  }
