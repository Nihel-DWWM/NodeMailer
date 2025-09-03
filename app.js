import express from 'express';
import mail from './routerTest.js';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
	res.send('Coucou');
});

app.use('/mail', mail);

app.listen(port);