import { Query } from '..';

const allBlogs = () => Query('SELECT blogs_table.*, authors_table.name FROM blogs_table JOIN authors_table ON authors_table.id = blogs_table.authorid');

const oneBlog = (id: number) => Query('SELECT blogs_table.*, authors_table.name FROM blogs_table JOIN authors_table ON authors_table.id = blogs_table.authorid WHERE blogs_table.id =?', [id]);

/* THIS IS THE LONG HANDED WAY TO DO THE PUT QUERY
const insertBlog = (title: string, content: string, authorid: number) =>
    Query('INSERT INTO blogs_table (title, content, authorid) VALUE(?, ?, ?)', [title, content, authorid]);
    */
const insertBlog = (newBlog: {title: string, content: string /*, authorid: number*/}) =>
    Query('INSERT INTO blogs_table SET ?', newBlog);

const updateBlog = (editedBlog: {title?: string, content?: string}, id: number) =>
    Query('UPDATE blogs_table SET ? WHERE id =?', [editedBlog, id]);

    const deleteBlog = (id: number) => Query('DELETE FROM blogs_table WHERE id = ?', [id]);

export default {
    allBlogs,
    oneBlog,
    insertBlog,
    updateBlog,
    deleteBlog
}