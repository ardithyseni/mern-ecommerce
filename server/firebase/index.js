
import * as admin from 'firebase-admin';

import fbServiceAccountKey from '../config/fbServiceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(fbServiceAccountKey)
});

export default admin;