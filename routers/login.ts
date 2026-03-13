import { Router } from 'express';
import { login } from '../services/user';

const router = Router();

router.get('/', async (req, res) => {
  req.session.destroy(() => {
    res.render('position');
  });
});

router.post('/', async (req, res) => {
  try {
    const user = await login(req.body.username, req.body.password);
    (req.session as any).user = { id: user.id, username: user.username };
    res.status(201).json({
      success: true,
      url: '/',
      user: { id: user.id, username: user.username },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
