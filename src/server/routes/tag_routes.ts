import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/tags
router.get('/', async (req, res) => {
    try {
            const tags = await db.tag_queries.all();
            res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});

export default router;