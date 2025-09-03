import transporter from "../transporter.js";



export const getWelcomeMessage = async (req, res) => {

     res.send(`
    <h1>Bienvenue!</h1>
    <h2>Formulaire de bienvenue</h2>
    <form action="/welcome" method="post">
      <label>Nom : <input type="text" name="nom" required></label><br><br>
      <label>Email : <input type="email" name="email" required></label><br><br>
      <button type="submit">Envoyer</button>
    </form>
  `);
}
export const sendWelcomeEmail = async (req, res) => {
    const { nom, email } = req.body;    
    try {

        await transporter.verify();
        console.log("Server is ready to take our messages");

        const mailOptions = {
        from: '"Notre Application" <tonemail@gmail.com>',
        to: email,
        subject: "Bienvenue 🎉",
        html: `<h3>Bonjour ${nom},</h3><p>Bienvenue dans notre application !</p>`,
      };
        await transporter.sendMail(mailOptions);

        res.send(`<p>Email de bienvenue envoyé à <b>${email}</b> ✅</p>`);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
        
           
    

