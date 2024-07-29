import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
  Signup,
  Login,
  testController,
  profileUpdateController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} from '../Controllers/authController.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);

router.get('/privateUser', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put('/user-profile', requireSignIn, profileUpdateController);

router.put('/admin-profile', requireSignIn, isAdmin, profileUpdateController);

router.get('/get-orders', requireSignIn, getOrdersController);

router.get('/get-all-orders', requireSignIn, isAdmin, getAllOrdersController);

router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

router.get('/test', requireSignIn, isAdmin, testController);

export default router;
