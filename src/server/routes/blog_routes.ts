import { Router } from "express";
import db from "../db";
const router = Router();

//GET request to /api/blogs/
router.get('/:blogid?', async (req, res) => {

    const blogid = Number(req.params.blogid)
    try {
        if (blogid) {
            const [singleBlog] = await db.blog_queries.oneBlog(blogid);
            res.json(singleBlog);
        } else {
            const allBlogs = await db.blog_queries.allBlogs();
            res.json(allBlogs);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});

//POST request to /api/blogs/
//{title: string, content: string, } are what is required (values)
router.post('/', async (req, res) => {
    const newBlog = req.body; //blogDTO is more standard practice for post request stands for data transferring object
    newBlog.authorid = 1; //hard coded because eventually, whoever is logged in will replace this
    try {
        const result = await db.blog_queries.insertBlog(newBlog);
        res.json({ msg: 'blog created', id: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});

//PUT request to /api/blogs/#id (blogid)
//{title?: string, content?: string, } are what is required (values)
router.put('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid)
    const editBlog = req.body; //blogDTO is more standard practice for post request stands for data transferring object
    try {
        const result = await db.blog_queries.updateBlog(editBlog, blogid);
        res.json({ msg: `blog ${blogid} edited`, affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});

//Delete request to /api/blogs/#id (blogid)
router.delete('/:blogid', async (req, res, next) => {
    try {
        const blogid = Number(req.params.blogid)

        const result = await db.blog_queries.deleteBlog(blogid);
        res.json({ msg: `blog and blogtags for ${blogid}  have been deleted`, affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        next(error);
        res.status(500).json({ msg: 'code is bunk', error: error.message })
    }
});


export default router; 