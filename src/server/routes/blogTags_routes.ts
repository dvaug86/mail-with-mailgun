import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/blogtags/1
router.get('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid)
    try {
            const [blogtags] = await db.blogTags_queries.retrieve(blogid);
            res.json(blogtags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});

//POST /api/blogtags
// request body{blogid: number, tagid: number, } are what is required (values)
router.post('/', async (req, res) => {
    const newBlogtag = req.body; 
    try {
        const result = await db.blogTags_queries.insertTag(newBlogtag.blogid, newBlogtag.tagid);
        res.json({ msg: 'blogtag inserted' , affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message });
    }
});

//PUT request to /api/blogtags/#id (blogid)
//Request Body {oldTagid: number, newTagid: number}
router.put('/:blogid', async (req, res) => {
    const tags = req.body
    const blogid = Number(req.params.blogid)

    try {
        const result = await db.blogTags_queries.updateTag(tags.newTagid, tags.oldTagid, blogid);
        res.json({ msg: `blogtags edited`, affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});

//Delete request to /api/blogs/#id (blogid)
router.delete('/:blogid', async (req, res, next) => {
    const blogid = Number(req.params.blogid)
    
    try {  
        const result = await db.blogTags_queries.deleteTag(blogid);
        res.json({ msg: ` blogtags for ${blogid}  have been deleted`, affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        next(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});

export default router; 