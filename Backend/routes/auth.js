// routes/auth.js
import express from 'express';
import {register , login} from "../controllers/authcontoller.js"

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
