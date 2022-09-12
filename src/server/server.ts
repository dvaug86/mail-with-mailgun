import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import apiRouter from './routes';

const app = express();

//middleware
app.use(express.static('public'));
app.use(morgan('dev')); //remember to do 'npm i morgan @types/morgan' 
app.use(express.json()); //body parser
app.use('/api', apiRouter); //'/api' is so that it can be localhost:300/api -> prefix
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));  //this is really only necessary for fullstack


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
