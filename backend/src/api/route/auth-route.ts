import { Router } from 'express';
import { body } from 'express-validator';

import * as AuthController from '../controller/auth-controller';

const router = Router();

router.post('/sign-in', [
    body('username').trim().notEmpty().isLength({max: 255}).isString(),
    body('password').trim().notEmpty().isLength({max: 255}).isString(),
    body('firstName').trim().notEmpty().isLength({max: 255}).isString(),
    body('lastName').trim().notEmpty().isLength({max: 255}).isString(),
    body('email').trim().notEmpty().isLength({max: 255}).isEmail()
], AuthController.signIn);

router.post('/authenticate', [
    body('username').trim().notEmpty().isLength({max: 255}).isString(),
    body('password').trim().notEmpty().isLength({max: 255}).isString()
], AuthController.authenticate);

export default router;
