import express from 'express';
import account from './routers/accountRouter.js'; //julien
// import contact from './contactRouter.js';	//Jerem
// import password from './passwordRouter.js'; //Paulé
// import welcome from './welcomeRouter.js';	//Nihel

const port = 3000;
const app = express();

import transporter  from "./transporter.js";

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/account', account);
// app.get('/coucou', (req,res)=>{
// 	res.send('yo')
// })
// app.use('/contact', contact);
// app.use('/password', password);
// app.use('/welcome', welcome);
// console.log(MAIL_RECEIVER)
// app.get('/', async (req, res) => {
// 	await transporter.sendMail({
//             from: process.env.MAIL_USER,
//             to: process.env.MAIL_RECEIVER,
//             subject: 'signup',
//             html: `<h1>Votre inscription est presque terminée ! Merci de cliquer sur le lien suivant pour finaliser l'inscription :</h1>
//                     http://localhost:3000/account/${process.env.MAIL_RECEIVER}`
//         })
// 	res.send('Coucou');
// });

app.listen(port)