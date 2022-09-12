//template

import { Router } from "express"; //template
import blogsRouter from './blog_routes';
import blogTagsRouter from './blogTags_routes';
import tagsRouter from './tag_routes'
import contactRouter from './contact_routes'

const router = Router(); //template

router.use('/contact', contactRouter)
router.use('/blogs', blogsRouter);  //the '/blogs' is what will show up after localhost:3000/api -> localhost:3000/api
router.use('/blogtags', blogTagsRouter);  
router.use('/tags', tagsRouter);  
export default router; //template