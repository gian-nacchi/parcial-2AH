import express from 'express';
import * as controller from '../controllers/usuarios.controllers.js';
import { validateLogin } from '../../middlewares/usuarios.validate.js';
import { validateRegister } from '../../middlewares/usuarios.validate.js';

const router = express.Router();

router.post("/",[validateRegister], controller.createUser);
router.post("/login",[validateLogin], controller.login);

export default router;