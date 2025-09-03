import express from 'express';
import { sendMail } from './controllerMail.js';

const router = express.Router();

router.get('/', sendMail);

export default router;