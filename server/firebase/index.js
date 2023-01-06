import admin from 'firebase-admin';
import fbServiceAccountKey from '../config/fbServiceAccountKey.json'  assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(fbServiceAccountKey)
});

export default admin;