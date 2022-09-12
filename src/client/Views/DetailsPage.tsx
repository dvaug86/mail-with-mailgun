import * as React from 'react';
import * as moment from 'moment';
import {useParams} from 'react-router-dom'
import type { IBlog, ITag } from '../utils/types';
import { Link } from 'react-router-dom';



const DetailsPage: React.FC<DetailsPageProps> = (props) =>{

    const {blogid} = useParams();
    const [blog, setBlog] = React.useState<IBlog | null>(null);
    const [blogtags, setBlogtags] = React.useState<ITag[]>([]);

    React.useEffect(() =>{  
        (async () => {
            const res = await fetch(`/api/blogs/${blogid}`);
            const blog = await res.json();
            const res2 = await fetch(`/api/blogtags/${blogid}`);
            const blogtags = await res2.json();
            
            setBlog (blog);
            setBlogtags (blogtags); //do it in this order promise, promise, setState to limit rerenders
        })();
    },[]);


    return(
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <article className="card my-2 shadow">
                        <div className="card-body">
                            <h1 className="card-text text-center">{blog?.title}</h1>
                            <h6 className="card-text text-center text-muted mb-2">
                                 written on {moment(blog?.created_at).format('MMM Do, YYYY')} by {blog?.name}
                            </h6>
                            <div className="d-flex justify-content-center align-items-center">
                                {blogtags.map(blogtag =>(
                                    <span className=' "badge badge-secondary" mx-2' key={`blogtags-${blogtag.id}`}> {blogtag.name}</span>
                               
                               ))}{/* need to figure out bootstrap issue for here*/ }
                            </div>
                            
                            <div className="card-text px-8 mb-5">{blog?.content.split('\n').map((para, i) => (
                            <p key={`p-block-${i}`}>{para}</p>
                            ))} 
                            {/* weDid this above with the paragraphs in order to have our paragraphs properly formatted */}
                            </div>
                            <div className='ml-md-5 mt-5 d-flex justify-content-between align-items-center mx-5'>
                                <Link className='btn btn-outline-secondary' to='/'> To Homepage</Link>
                                <Link className='btn btn-outline-secondary' to={`/admin/${blogid}`}>To Admin Page</Link>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}

interface DetailsPageProps {}

export default DetailsPage;