import express from 'express';
import thoughtRoutes from './api/thoughtRoutes';
import userRoutes from './api/userRoutes';

const router = express.Router();

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

export default router; 
