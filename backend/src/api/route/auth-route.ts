import { Router } from 'express';
import { body } from 'express-validator';

import * as AuthController from '../controller/auth-controller';

const router = Router();

router.post('/sign-in', [
    body('username').trim().notEmpty().isLength({max: 255}),
    body('password').trim().notEmpty().isLength({max: 255}),
    body('firstName').trim().notEmpty().isLength({max: 255}),
    body('lastName').trim().notEmpty().isLength({max: 255}),
    body('email').trim().notEmpty().isLength({max: 255})
], AuthController.signIn);

router.post('/authenticate', [
    body('username').trim().notEmpty().isLength({max: 255}),
    body('password').trim().notEmpty().isLength({max: 255})
], AuthController.authenticate);

export default router;
