import express from 'express';
import createAccount from './createAccount.js'; //julien
import contact from './contact.js';	//Jerem
import password from './password.js'; //Paulé
import welcome from './welcome.js';	//Nihel

const port = 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/createAccount', createAccount);
app.use('/contact', contact);
app.use('/password', password);
app.use('/welcome', welcome);

app.get('/', (req, res) => {
	res.send('Coucou');
});

app.listen(port);