import express from 'express';
import { deleteUser, getSaved, getUser, save, update} from '../crud/userC.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.put("/:id", verifyToken, update)
router.put('/:id', getUser)
router.delete('/:id', verifyToken, deleteUser)
router.put("/save/:videoId", verifyToken, save);
router.get("/saved/:id", verifyToken, getSaved)

export default router