import { Query }from '../index';

const all = () => Query('SELECT * FROM tags_table');

export default {
    all
}