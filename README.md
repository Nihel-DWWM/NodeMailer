
# NodeMailer

## Fonctionnement de `passwordRouter` avec son controller

### Imports

- **Router** : permet de créer un mini-routeur Express.
- **db** : accès à la base JSON via lowdb.
- **crypto** : pour générer un token unique.
- **transporter** : pour envoyer des emails avec Nodemailer.

### Création du routeur

- `const router = Router();` : on crée un routeur Express pour y attacher nos routes.

### Route POST `/password/forgot`

- `router.post('/forgot', async (req, res) => { ... })` : cette route reçoit un email en POST.
- `const { email } = req.body;` : on récupère l’email envoyé par le formulaire.
- On prépare un message générique pour ne jamais révéler si l’email existe ou non.

### Recherche de l’utilisateur

- `await db.read();` : on charge les données à jour depuis le fichier JSON.
- `const user = db.data.users.find(u => u.email === email);` : on cherche l’utilisateur correspondant à l’email.

### Si l’utilisateur existe

- On génère un token unique avec `crypto.randomUUID()`.
- On calcule la date d’expiration (15 minutes plus tard).
- On ajoute un objet token dans la base (token, email, expiration, non utilisé).
- On sauvegarde la base avec `await db.write();`.
- On prépare le lien de reset à envoyer par mail.
- On envoie le mail avec Nodemailer.

### Réponse

- On répond toujours `{ message: "Si cet email existe, un lien a été envoyé." }` pour la sécurité.