import express from 'express';
import { googleAuth, signin, signup } from  "../crud/authenticationC.js";

const router = express.Router();

router.post("/signin",signin);
router.post("/signup",signup);
router.post("/google", googleAuth);

export default router;
