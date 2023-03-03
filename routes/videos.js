import express from 'express';
import { addVideo, getByTag, getVideo, random, search, deleteSaved} from "../crud/videoC.js";
import { verifyToken } from '../verifyToken.js';
const router = express.Router();


router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.get("/find/:id", getVideo)
router.get("/random", random)
router.get("/tags", getByTag)
router.get("/search", search)
router.delete("/saved/:userId",verifyToken, deleteSaved)
// router.get()

export default router;