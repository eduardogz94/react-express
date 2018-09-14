import express from 'express';
import session from '../controllers/session'
let router = express.Router();

router.use('/', session);

export default router;
