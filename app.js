import express from 'express';
import account from './accountRouter.js'; //julien
import contact from './contactRouter.js';	//Jerem
import password from './passwordRouter.js'; //Paulé
import welcome from './welcomeRouter.js';	//Nihel

const port = 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/account', account);
app.use('/contact', contact);
app.use('/password', password);
app.use('/welcome', welcome);

app.get('/', (req, res) => {
	res.send('Coucou');
});

app.listen(port);