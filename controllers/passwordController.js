import { db } from '../db.js';
import crypto from 'crypto';

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
  // Hash du mot de passe avec crypto (pbkdf2)
  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, salt, 100000, 64, 'sha512', async (err, derivedKey) => {
    if (err) return res.status(500).json({ success: false, message: 'Erreur de hashage.' });
    user.password = `${salt}:${derivedKey.toString('hex')}`;
    reset.used = true;
    await db.write();
    res.json({ success: true, message: 'Mot de passe réinitialisé.' });
  });
}

