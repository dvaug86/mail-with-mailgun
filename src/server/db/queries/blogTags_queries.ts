import { Query } from '../';

const retrieve = (blogid: number) => Query('CALL spBlogTags(?)', [blogid])
/* What this query is doing:
    spBlogTags(blog_id INT)
    SELECT tags_table.id, tags_table.name FROM blogtags_table
    JOIN tags_table ON tags_table.id = blogtags_table.tagid
    WHERE blogid = blog_id;
*/
const insertTag = (blogid: number, tagid: number) =>
    Query('INSERT INTO blogtags_table (blogid, tagid) VALUES (?, ?)', [blogid, tagid])

const deleteTag = (blogid: number) =>
    Query('DELETE FROM blogtags_table WHERE blogid = ?', [blogid]);

const updateTag = (newTagid: number, oldTagid: number, blogid: Number) =>
    Query('UPDATE blogtags_table SET tagid = ? WHERE blogid = ? AND tagid = ?', [newTagid, blogid, oldTagid]);

export default {
    retrieve,
    insertTag,
    deleteTag,
    updateTag
}