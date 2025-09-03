import { Router } from 'express';
import { resetPassword } from '../controllers/passwordController.js';

const router = Router();

// Route POST /password/reset
router.post('/reset', resetPassword);

export default router;

