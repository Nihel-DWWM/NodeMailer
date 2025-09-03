
import transporter from '../transporter.js';
import { db } from '../db.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function forgotPassword(req, res) {
  const { email } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  const genericMsg = 'Si cet email existe, un lien a été envoyé.';
  if (user) {
    const token = crypto.randomBytes(20).toString('hex');
    db.data.resetTokens.push({ token, email });
    await db.write();
    const resetLink = `http://localhost:3000/reset?token=${token}`;
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
  if (!reset) {
    return res.status(400).json({ success: false, message: 'Token invalide.' });
  }
  const user = db.data.users.find(u => u.email === reset.email);
  if (!user) {
    return res.status(400).json({ success: false, message: 'Utilisateur introuvable.' });
  }
  user.password = await bcrypt.hash(password, 10);
  await db.write();
  res.json({ success: true, message: 'Mot de passe réinitialisé.' });
}

