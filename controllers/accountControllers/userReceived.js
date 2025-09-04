import db from '../../db.js'
import jwt from 'jsonwebtoken'
import transporter from '../../transporter.js'

export default async function (req, res) {
    try {
        //stockage en lowdb
        req.body.isActive = 'pending'
        console.log(req.body)
        db.data.users.push(req.body)
        console.log(db.data)
        db.write()
        //création token
        const token =jwt.sign({userEmail: req.body.email}, 'secret', {expiresIn: '15m'})
        console.log('token créé')
        await transporter.verify()
        console.log('serveur mail ready')
        // await transporter.sendMail({
        //     from: process.env.MAIL_USER,
        //     to: req.body.email,
        //     subject: 'signup',
        //     html: `<h1>Votre inscription est presque terminée ! Merci de cliquer sur le lien suivant pour finaliser l'inscription :</h1>
        //             http://localhost:3000/account/${req.body.email}`
        // })
        res.send(`${req.body.name} votre inscription est presque terminée, un email de confirmation vous a été envoyé sur l'adresse mail renseignée`)
    }
    catch (error) {
        throw error
    } 
}