import * as React from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';  //npm i moment no need for typescript as it already has it
import { IBlog } from '../utils/types';



const HomePreviewCard: React.FC<HomePreviewCardProps> = ({ blog }) => {
    return (
        <div className="col-md-4">
            <article className="card my-2 shadow">
                <div className="card-body">
                    {/* we will use blog.whatever from the Iblot in utils/types */}
                    <h4 className="card-title">{blog.title}</h4>
                    <p className="card-text text-muted mb-2">{blog.name}</p>
                    <p className="card-text">{blog.content.substring(0, 100)}...</p>
                    <div className="d-flex align-items-center justify-content-between">
                        <span className="card-text text-muted ">
                            {moment(blog.created_at).format('MMM do, YYYY')}
                        </span>
                        <Link className="btn btn-sm btn-primary" to={`/details/${blog.id}`}>Read More!</Link>
                    </div>
                </div>
            </article>
        </div>
    )
}

interface HomePreviewCardProps {
    blog: IBlog
}

export default HomePreviewCard;