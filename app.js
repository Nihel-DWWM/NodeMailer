import express from 'express';
import password from './routers/passwordRouter.js';

const port = 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/password', password);

app.get('/', (req, res) => {
	res.send('Coucou');
});

app.listen(port);