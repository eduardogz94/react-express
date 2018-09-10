import express from 'express';
import session from './session'
let router = express.Router();

router.use('/', session);

module.exports = router;
