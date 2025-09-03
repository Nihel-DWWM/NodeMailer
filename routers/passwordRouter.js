import { Router } from 'express';
import { resetPassword, forgotPassword } from '../controllers/passwordController.js';

const router = Router();


// Route POST /password/forgot
router.post('/forgot', forgotPassword);

// Route POST /password/reset
router.post('/reset', resetPassword);

export default router;

