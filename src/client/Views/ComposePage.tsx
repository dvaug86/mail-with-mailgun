import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import type { ITag } from '../utils/types';

const ComposePage: React.FC<ComposePageProps> = (props) => {
    const history = useNavigate();
    //form states
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

    //need to add db and routes
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log({ title, content })
        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
        const blogResult = await res.json();

        if (Number(selectedTag)) {  //can also use (selectedTag !== '0')
                 const res2 = await fetch('/api/blogtags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ blogid: blogResult.id, tagid: selectedTag })
        });
        const blogtagResult = await res2.json();
        console.log(blogtagResult);

   
        }

        history(`/details/${blogResult.id}`);
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

                        <div className="d-flex justify-content-end">
                            <button onClick={handleSubmit} className="btn btn-primary btn-lg mt-3">Submit!</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

interface ComposePageProps { }

export default ComposePage;