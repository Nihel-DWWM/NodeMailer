import transporter from '../transporter.js';
import { db } from '../db.js';
import crypto from 'crypto';

export async function forgotPassword(req, res) {
  const { email } = req.body;
  const genericMsg = 'Si cet email existe, un lien a été envoyé.';
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  if (user) {
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    db.data.resetTokens.push({
      token,
      email,
      expires: expires.toISOString(),
      used: false
    });
    await db.write();
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Réinitialisation de mot de passe',
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`
    });
  }
  res.json({ message: genericMsg });
}


export async function resetPassword(req, res) {
  const { token, password, confirm } = req.body;
  if (!token || !password || !confirm) {
    return res.status(400).json({ success: false, message: 'Champs manquants.' });
  }
  if (password !== confirm) {
    return res.status(400).json({ success: false, message: 'Les mots de passe ne correspondent pas.' });
  }
  await db.read();
  const reset = db.data.resetTokens.find(t => t.token === token);
  if (!reset || reset.used) {
    return res.status(400).json({ success: false, message: 'Token invalide ou déjà utilisé.' });
  }
  if (new Date(reset.expires) < new Date()) {
    return res.status(400).json({ success: false, message: 'Token expiré.' });
  }
  const user = db.data.users.find(u => u.email === reset.email);
  if (!user) {
    return res.status(400).json({ success: false, message: 'Utilisateur introuvable.' });
  }
  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, salt, 100000, 64, 'sha512', async (err, derivedKey) => {
    if (err) return res.status(500).json({ success: false, message: 'Erreur de hashage.' });
    user.password = `${salt}:${derivedKey.toString('hex')}`;
    reset.used = true;
    await db.write();
    res.json({ success: true, message: 'Mot de passe réinitialisé.' });
  });
}

