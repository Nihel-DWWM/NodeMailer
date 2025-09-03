import express from 'express' 
import { getWelcomeMessage } from '../controllers/welcomeController.js';
import { sendWelcomeEmail } from '../controllers/welcomeController.js';

const router = express.Router();


router.post('/', sendWelcomeEmail);
router.get('/', getWelcomeMessage);


export default router;
