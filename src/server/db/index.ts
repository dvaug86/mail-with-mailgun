import * as mysql from 'mysql';
import config from '../config'

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
                        //query here is a string, the values (if we have one suggested by the ?) can either be an object or 
                        //an array of either numbers or strings.
                        //can also do values?:{} | Array<number | string> which is much more specific and a better
                        //option than any.
    return new Promise<T>((resolve, reject) => {
        
        const sql = mysql.format(query,values);
        //console.log(sql); DEBUGGING FORMAT

        pool.query(sql, (err, results) => {
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
};

import blog_queries from './queries/blog_queries';
import blogTags_queries from './queries/blogTags_queries';
import tag_queries from './queries/tag_queries';
export default{
    blog_queries,
    blogTags_queries,
    tag_queries
}