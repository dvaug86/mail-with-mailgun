import * as React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import type { ITag } from '../utils/types';
//@ts-ignore
let oldID = null;

const AdminPage: React.FC<AdminPageProps> = (props) => {
    //routing context
    const history = useNavigate();
    const { blogid } = useParams();

    //formstates
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [selectedTag, setSelectedTag] = React.useState('0');

    //tags state
    const [tags, setTags] = React.useState<ITag[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await fetch('/api/tags');
            const tags = await res.json();
            setTags(tags);
        })()
    }, []);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${blogid}`);
            const blog = await res.json();

            const res2 = await fetch(`/api/blogtags/${blogid}`);
            const blogtags = await res2.json();
            //@ts-ignore
            oldID = blogtags[0].id
            setTitle(blog.title);
            setContent(blog.content);
            setSelectedTag(blogtags[0].id);

        })();
    }, [blogid]);

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await fetch(`/api/blogs/${blogid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
        const resultBlog = await res.json();
        console.log(resultBlog);
        //@ts-ignore
        if (oldID !== Number(selectedTag)) {

            const res2 = await fetch(`/api/blogtags/${blogid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            const res = await fetch(`/api/blogs/${blogid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            const resultBlogtag = await res2.json();
            console.log(resultBlogtag);
        }
        history(`/details/${blogid}`);
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/blogtags/${blogid}`, {
            method: 'DELETE' //not properly working due to author i think
        });
        const res2 = await fetch(`/api/blogs/${blogid}`, {
            method: 'DELETE' //not properly working due to author i think
        });
        if (res.ok && res2.ok) {
            history('/');
        }
    }


    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <form className="form-group p-3">
                        {/* go back and make sure padding and margins at end */}

                        <label htmlFor="title">Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            className="form-control form-control-lg mb-2"
                            placeholder='Title'
                        // a controlled react input like above needs to have a value and onChange in this case the state of title 
                        />

                        <label htmlFor="selected tag">Select a Tag</label>
                        <select value={selectedTag}
                            onChange={e => setSelectedTag(e.target.value)}
                            className='form-control form0control-lg w-25 mb-2' >
                            <option disabled value="0">
                                Select a Tag
                            </option>
                            {tags.map(tag => (
                                <option key={`tag-${tag.id}`} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="content">Content</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={20}
                            className="form-control form-control-lg mb-2"
                            placeholder='Place your Blog content'
                        />
                        <div className="d-flex justify-content-between align-items-center">
                            <Link className='btn btn-outline-secondary btn-lg' to={`/details/${blogid}`}>Go Back</Link>
                            <div>
                                <button onClick={handleEdit} className="btn btn-primary btn-lg  mx-3">Edit!</button>
                                <button onClick={handleDelete} className="btn btn-outline-danger btn-lg  mx-3">Delete!</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

interface AdminPageProps { }

export default AdminPage;