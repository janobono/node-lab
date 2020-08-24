import express from 'express';
import { router as infoRouter } from './info';

const router = express.Router({
    strict: true
});

router.use('/info', infoRouter);

export { router };
