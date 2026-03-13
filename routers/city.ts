import { Router } from 'express';
import { save, remove } from '../services/city';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = (req.session as any).user;
    await save(user.id, req.body.name);
    res.status(201).json({ success: true });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const user = (req.session as any).user;
    await remove(user.id, req.body.id);
    res.status(201).json({ success: true });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
});

export default router;
